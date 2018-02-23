const mysql = require("mysql");
const inquirer = require('inquirer');
const ansi = require('ansicolor').nice;
let asTable = require('as-table');
asTable = require ('as-table').configure ({ title: x => x.bright, delimiter: ' | '.dim.cyan, dash: '-'.bright.cyan });
 
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

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
      name: "action",
      message: "Please select from menu list below: ",
      choices: ['View Product Sales by Department', 'Create New Department', 'Exit Program']
    }
    ])
    .then(function(answer) {
      switch (answer.action) {

      case "View Product Sales by Department":
        viewProdSales();
        break;

      case "Create New Department":
        addDept();
        break;

      case "Exit Program":
        console.log('Goodbye');
        return connection.end();
        break;

      }
    });
}

function viewProdSales() {
  let query = "SELECT department_id, departments.department_name, over_head_costs, ";
  query += "SUM(products.product_sales) AS product_sales, ";
  query += "SUM(product_sales) - over_head_costs AS total_profit ";
  query += "FROM products LEFT JOIN departments ";
  query += "ON products.department_name = departments.department_name ";
  query += "GROUP BY department_id";

  connection.query(query, function(err, res) {
    let tbleArr = [];
    for (let i = 0; i < res.length; i++) {
      tbleArr.push(res[i]);
    }
  console.log('\n\n' + asTable(tbleArr) + '\n\n');
  deptSales();
  })
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "Enter Department Name: "
      },
      {
        type: "input",
        name: "ohc",
        message: "Enter Over Head Costs: "
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answer.dept,
          over_head_costs: answer.ohc,
        },
        function(err) {
          if (err) throw err;
          console.log("Success!");
          deptSales();
        }
      );
    });
}