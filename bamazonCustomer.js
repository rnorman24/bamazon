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
    readProducts();
  });

  function readProducts() {
    console.log("Selecting all products for sale...\n");
    let query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
      if (err) throw err;

      for (let i = 0; i < res.length; i++) {
      console.log('Item Id: ' + res[i].item_id +
       '\tProduct Name: ' + res[i].product_name +
       '\tPrice: ' + res[i].price +
        '\n');
      }
      buyProduct();
    });
  }

function buyProduct() {
  inquirer
    .prompt([
    {
      name: "itemId",
      type: "input",
      message: "Please enter the Item ID of the product you'd like to buy: ",
    },
    {
      name: "units",
      type: "input",
      message: "Please enter how many you'd like to buy: ",
    }
    ])
    .then(function(answer) {
      console.log(answer.itemId);
      connection.query("SELECT * FROM products WHERE ?",
      { item_id: answer.itemId }, function(err, res) {
        let qty = answer.units;      
        let totalPrice = qty * res[0].price;
        let stock = res[0].stock_quantity;
          if (stock < qty) {
            console.log('Insufficient quantity! Only ' + stock +
            ' remain in stock.');
          } else { 
            let updateStock = stock - parseInt(qty);
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
              console.log('Your total price is $' + totalPrice +
              ', Thank you for your order.');
              console.log('Remaining stock: ' + updateStock);
            })
          }
      })
    })
}
  //connection.end();