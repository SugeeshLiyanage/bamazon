DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER(10) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Books", "Stationery", 10.50, 20),
("Computers", "Technology", 850.00, 100),
("Monitors", "Technology", 125.25, 150),
("Calculators", "Stationery", 95.00, 24),
("Chairs", "Furniture",1125, 10),
("Desks", "Furniture", 1200, 5),
("Lamps", "Furniture", 45, 60),
("Cables", "Technology", 15.25, 100),
("Worldmap", "Stationery", 8.50, 24),
("Couchs", "Furniture", 155, 12);

CREATE TABLE departments (
    department_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NULL,
    over_head_costs DECIMAL(10,2) NULL,
    total_sales DECIMAL(10,2) NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs, total_sales)
VALUES 
	("Stationery", 5000.00, 6000.00),
    ("Technology", 8000.00, 5000.00),
    ("Furniture", 5500.00, 9000.00),
    ("Stationery", 8500.00, 4000.00),
    ("Technology", 10000.00, 8000.00),
    ("Furniture", 2500.00, 1250.00);











