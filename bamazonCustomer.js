var mysql = require("mysql");
var prompt = require("prompt");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    //Your username
    user: "root",
    //Your password
    password: "Dulinika2014",
    database: "bamazonDB"   
});
//Connection to the bamazon Database
connection.connect(function(err) {
    if (err) {
    console.log("Error connecting to DB");
    return;
    }
    console.log('Conncection established');
    
var schema = {
    properties: {
        ID: {
            message: "Please enter the ID of the product you would like to buy.",
            required: true
        },
        howMany: {
            message: "Please enter how many you would like to buy. ",
            required: true
        }
    }
};

var schema2 = {
    properties: {
        AnotherPurchase: {
        message: "Would you like to buy another item ? ",
        pattern: /(no|n|yes|y)/,
        required: true
        },
    }
};

//Function to stop the app
var stopApp = function(){
    //return next(err);
    console.log("Thank you for visiting bamazon, Come back again!")
    connection.end();
    
}
//Function to start the app
var beginApp = function(){
    connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;
        return (getProducts(result));

    });
}

//Function to display all of the products available for sale in a table
var getProducts = function (products) {
    console.log("Hello, Welcome to Bamazon ! Here are all of the products, their costs and current stock.");
    for (var i = 0; i < products.length; i++) {
        var productsResults = "\r\n"+
        "ItemID: " + products[i].item_id+"\r\n"+
        "Product Description: " + products[i].product_name+"\r\n"+
        "Department: " + products[i].department_name+"\r\n"+
        "Price: $"+ products[i].price+"\r\n"+
        "Current Stock: "+ products[i].stock_quantity;
        console.log(productsResults);
    }
    userSelectID();
}

//Function to get the user selected items
var userSelectID = function() {
    prompt.start();
    console.log("Please enter the ID of the product you would like to buy. ");

    prompt.get(schema, function (err,result) {
        if (err) {
            console.log(err)
        }
        //console.log(result);
        var userChoiceID = parseInt(result.ID);
        var userChoiceHowMany = parseInt(result.howMany);

        
        //Function to check the inventory of an item
        var checkInventory = function() {
            connection.query('SELECT * FROM products WHERE item_id =' + userChoiceID, function(err,result) {
                if (err) throw err;
                //console.log(result);

                var userWantsToBuy = userChoiceHowMany;
                var productInventory = result[0].stock_quantity;
                var productsPrice = result[0].price;
                var isInStock = productInventory - userWantsToBuy;
                var totalCost = productsPrice * userWantsToBuy;

                if (userWantsToBuy > productInventory || productInventory === 0) {
                    console.log("Sorry There isn't enough in stock to completed your order. Please try again later."+"\r\n"+"\r\n");
                    userSelectID(); 
                } else {
                    console.log("There are "+result[0].stock_quantity+" of "+result[0].product_name);
                    console.log("You are purchasing "+ userWantsToBuy +" "+result[0].product_name+"s at $"+ result[0].price+" per item.");
                    console.log("Your total is $ "+totalCost);
                    connection.query('UPDATE products SET stock_quantity = '+isInStock+' WHERE item_id ='+userChoiceID, function(err, result) {
                    if (err) throw err;
                    connection.query('SELECT item_id, product_name, department_name, price, stock_quantity, FROM products WHERE item_id ='+userChoiceID, function(err, result) {
                        //console.log(result);
                    });                 
                        
                    });             
            prompt.get(schema2, function (err, result) {
                if (err) {
                    console.log(err)
                }
                console.log(result);
                var userAnswer = result.AnotherPurchase;
                if (userAnswer === "n" || userAnswer === "no") {
                    stopApp();
                } else {
                    beginApp();
                }
                });
            }
            });
        };
        checkInventory();
    });
    }

//start the app
beginApp();
});