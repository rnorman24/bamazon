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
          "Add New Product",
          "Exit Program"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
        viewProducts();
        break;

        case "View Low Inventory":
        viewLowInv();
        break;

        case "Add to Inventory":
        addInv();
        break;

        case "Add New Product":
        addProd();
        break;

        case "Exit Program":
        console.log('Goodbye');
        return connection.end();
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

function viewLowInv() {
  console.log("Selecting all products for sale...\n");
  let query = "SELECT item_id, product_name, price, stock_quantity FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      if (res[i].stock_quantity < 6) {
      console.log('Item Id: ' + res[i].item_id +
      '\tProduct Name: ' + res[i].product_name +
      '\tPrice: ' + res[i].price +
      '\tStock: ' + res[i].stock_quantity +
      '\n');
      }
    }
    runManager();
  });
}

function addInv() {
  inquirer
    .prompt([
    {
      type: "input",
      name: "itemId",
      message: "Enter Id of product to add inventory to: ",
    },
    {
      type: "input",
      name: "units",
      message: "Quantity to add: ",
    }
    ])
    .then(function(answer) {
      console.log(answer.itemId);
      connection.query("SELECT * FROM products WHERE ?", { item_id: answer.itemId }, function(err, res) {
        let qty = answer.units;      
        let stock = res[0].stock_quantity;
          let updateStock = stock + parseInt(qty);
          connection.query('UPDATE products SET ? WHERE ?',
            [
              {
                stock_quantity: updateStock
              },
              {
                item_id: answer.itemId
              }
            ],
            function(err) {
              if (err) throw err;
              console.log('Remaining stock: ' + updateStock);
              runManager();
            }
          )        
      })
    })        
  }

function addProd() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "prod",
        message: "Enter Product Name: "
      },
      {
        type: "input",
        name: "dept",
        message: "Enter Department Name: "
      },
      {
        type: "input",
        name: "price",
        message: "Enter Price: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        type: "input",
        name: "inv",
        message: "Enter Beginning Inventory Quantity: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.prod,
          department_name: answer.dept,
          price: answer.price,
          stock_quantity: answer.inv
        },
        function(err) {
          if (err) throw err;
          console.log("Success!");
          // re-prompt the user for if they want to bid or post
        }
      );
    });
}
