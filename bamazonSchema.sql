DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

ALTER TABLE products ADD product_sales DECIMAL(10,2) NOT NULL;

SELECT department_id, departments.department_name, over_head_costs, SUM(products.product_sales) AS product_sales, products.product_sales + -departments.over_head_costs AS total_profit FROM products
LEFT JOIN departments ON products.department_name = departments.department_name
GROUP BY department_id;