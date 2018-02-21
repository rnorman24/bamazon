const mysql = require("mysql");
const inquirer = require('inquirer');
asTable = require ('as-table');

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
  deptSales();
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

      console.log(answer);
       connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "department_id: " +
              res[i].department_id +
              " || department_name: " +
              res[i].department_name +
              " || over_head_costs: " +
              res[i].over_head_costs +
              " || product_sales: " +
              res[i].product_sales +
              " || total_profit: " +
              res[i].total_profit
          );
        }
      
      });
  })
}
