// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: 'Dulinika2014',
	database: 'bamazonDB'
});

var newDept = [];

connection.connect();

//creates the question that will be prompted to the user
var supervisorOptions = {
    properties:{
        eOptions:{
            description: colors.yellow('Select one of the following options: 1) View Product Sales by Department 2) Create New Department')
        },
    },
};

prompt.start();

//gets the information responded by user from the prompt
prompt.get(supervisorOptions, function(err, res){
    //This explains what should be done based on what the user answered to the prompt
    if(res.eOptions == 1){
        viewProductSales();
} else if(res.eOptions == 2){
    createDepartment();
} else{
    console.log('You picked an invalid choice!');
    connection.end();
}
});

//creates a function to be run when the user picks option 1
var viewProductSales = function(){
    //creates a table for the data to be stored and displayed in node
    var table = new Table({
        head: ['Department ID', 'Department Name', 'Overhead Cost', 'Total Sales', 'Total Profit'],
        style: {
            head: ['yellow'],
            compact: false,
            colAligns: ['center'],
        }
    });
    console.log(' ');
    console.log(colors.red.bgWhite.underline('Product Sales by Department'));

    //connects to the mysql database and grabs the information from the alias table called totalprofits. this table contains all information from the Department database but also has an extra column that calculates how much the total profits are based on the overhead cost and the total sales made for each department
    connection.query('SELECT * FROM totalprofits', function(err, res){
        if(err) console.log('Error: ' + err);

        //this loops thorough the data pulled from the totalprofits database and pushes it into the table above
        for(var i = 0; i<res.length; i++){
            table.push(
                [res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].total_sales, res[i].TotalProfit]
            );
        }

        console.log(' ');
        console.log(table.toString());
        connection.end();
    })
};

//creates the function to be run when the user selects option 2
var createDepartment = function() {

    //creates the questions to be prompted to the user when option 2 is selected, since the department_id auto increments the user doesn't have to enter anything for item_id and since total is calculated based on sales made, user doesn't input any data for total sales
     var newDepartment = {
         properties: {
             newDeptName:{ description: colors.magenta('Please enter the name of the Department you would like to add.')
            },
            newOverhead:{ description: colors.magenta('What are the overhead costs for this department ?')
        },
        }
     }

     prompt.start();
     //gets the information the user entered for the prompt above
     prompt.get(newDepartment, function(err, res){
         //creates a variable to store the user response
         var newDeptInfo = {
             deptName: res.newDeptName,
             overHeadNew: res.newOverhead,
             autoTotalSales: 0,
         };
         //pushes user responses to the array defined above by the variable DewDept
         newDept.push(newDeptInfo);
         //connects to the mysql database Departments and insert the information received from the user into the database to create a new department
         connection.query('INSERT INTO departments (department_name, over_head_costs, total_sales) VALUES (?, ?, ?);', [newDept[0].deptName, newDept[0].overHeadNew, newDept[0].autoTotalSales], function(err, result){
             if(err){
                 console.log('Error: ' + err);
                 connection.end();
             }else {
                 console.log('');
                 console.log(colors.yellow.underline('New Department successfully created!'));
                 console.log(' ');
                 connection.end();
             }
         })
    })
};


