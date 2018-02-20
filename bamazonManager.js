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
  console.log('db connected')
  runManager();
});

function runManager() {
  inquirer
    .prompt({
      type: "rawlist",
      name: "action",
      message: "What would you like to do?",
      choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
        viewProducts();
        break;

        case "View Low Inventory":
        console.log('Low Inventory');
        break;

        case "Add to Inventory":
        console.log('Add Inventory');
        break;

        case "Add New Product":
        console.log('New Product');
        break;

      }
    });
}

function viewProducts() {
  console.log("Selecting all products for sale...\n");
  let query = "SELECT item_id, product_name, price, stock_quantity FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
    console.log('Item Id: ' + res[i].item_id +
     '\tProduct Name: ' + res[i].product_name +
     '\tPrice: ' + res[i].price +
     '\tStock: ' + res[i].stock_quantity +
      '\n');
    }
    runManager();
  });
}
