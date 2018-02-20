const mysql = require("mysql");

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
      connection.end();
    });
  }
