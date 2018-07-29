# bamazon
Bamazon is a command line node app that emulates an online store, complete with access to a real-time database. The app offers users 3 roles: customer, manager, and supervisor.
Watch the demo
Description
Bamazon accesses 2 tables within the database: departments and products. Users are prompted to select one of 3 roles, with the options for each listed below.
Customer
Customers have 4 options:
View all products available to purchase, including the product id, product name, and price.
Purchase a product by entering the product id and quantity desired. The quantity and total sales for this product are then updated in the products database, and the purchased item's information is printed to the screen, including product name, price, quantity purchased, and total cost of the purchase.
Return to role menu.
Exit the app.
Manager
Managers have 6 options:
View all products available to purchase, including the product id, product name, price, and quantity on hand.
View products with an inventory lower than 5, printing the product id, product name, price, and quantity on hand. Users are notified if all items have a quantity of 5 or more, and no results are printed.
Increase the inventory of a product. The user is prompted for the product id and quantity to add. The product's information, including product name, department, price, and updated quantity are printed.
Add a new product to the site. The user is prompted for the product's name, department, price, and quantity on hand. The department must be in the departments database for an item to be added successfully. If the department does not exist, the user is prompted to have a supervisor add the department. Upon the successful addition of the new product, the product name, department, price, and quantity on hand are printed.
Return to role menu.
Exit the app.
Supervisor
Supervisors have 4 options:
View product sales by department. Each department is printed to the screen with its id, name, overhead costs, and aggregate department sales. The total profit for the department is calculated on the fly by subtracting the overhead costs from the product sales. Only departments with products built by the manager will print.
Add a new department to the database. The user is prompted for the department name and overhead costs. Again, the newly added department will not display in the option to view product sales by department until at least one product with that department has been added by a manager.
Return to role menu.
Exit the app.
Setup and Usage
Bamazon can be run using the index.js file, which then accesses the files containing the customer, manager, and supervisor applications. Init and seed files are included for the creation of the Bamazon database. Users should create their own .env file containing the database password.
Concepts Used
MySQL database queries
Node require and module exports
Future Development
This command line app serves as an online store emulator, so most future development would involve adding some of the other functions of an online store:
A shopping cart to hold added products as the customer shops
The ability to remove products from the cart
The ability to purchase everything in the cart (purchase multiple product types with quantities at once)
The calculation of taxes and shipping costs
Search functionality for product name and department
Negative adjustments to inventory
Removing products from the store
Displaying sales totals for individual departments based on user search
Removing departments for the department database
Additional validation
Node Packages Used
inquirer
mysql
table
figlet
colors
dotenv
Authors
