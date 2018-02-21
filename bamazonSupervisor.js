const mysql = require("mysql");
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "s3cr1t",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
});

function deptSales() {
  inquirer
    .prompt([
    {
      type: "rawlist",
      name: "superv",
      message: "Please select from menu list below: ",
      choice: ['View Product Sales by Department', 'Create New Department']
    }
    ])
    .then(function(answer) {
      let query = "SELECT department_id, departments.department_name, over_head_costs";
      query += "SUM(products.product_sales) AS product_sales, product_sales - over_head_costs AS total_profit";
      query += "FROM products LEFT JOIN departments ON products.department_name = departments.department_name";
      query += "GROUP BY department_id";

      console.log(answer.itemId);
      connection.query("SELECT * FROM products WHERE ?",
      { item_id: answer.itemId }, function(err, res) {
        let qty = answer.units;      
        let totalPrice = parseInt(qty) * res[0].price;
        let stock = res[0].stock_quantity;
          if (stock < qty) {
            console.log('Insufficient quantity! Only ' + stock +
            ' remain in stock.');
          } else { 
            let updateStock = stock - parseInt(qty);
            connection.query('UPDATE products SET ? WHERE ?',
            [
              {
                stock_quantity: updateStock,
                product_sales: totalPrice
              },
              {
                item_id: answer.itemId
              }
            ],
            function(err) {
              if (err) throw err;
              console.log('Your total price is $' + Math.floor(totalPrice, -2) +
              ', Thank you for your order.');
              console.log('Remaining stock: ' + updateStock);
              })
            }
          })
    })
}