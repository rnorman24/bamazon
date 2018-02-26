# bamazon

## Overview

In this activity, I created an Amazon-like storefront demonstrating MySQL skills. The app will take in orders from customers and deplete stock from the store's inventory. I then programed my app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

## Demonstrations

### Demonstration #1: Customer View

1. Created a MySQL Database called `bamazon`.

2. Created a Table inside of that database called `products`.

3. The products table has each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populated database with around 10 different products with mock data.

5. Created a Node application called `bamazonCustomer.js`. This application first displays all of the items available for sale. Including the ids, names, and prices of products for sale.

6. The app prompts users with two messages.

   * The first asks them the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

7. Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

   * If not, the app logs the phrase `Insufficient quantity!`, and then prevents the order from going through.

8. However, if the store _does_ have enough of the product, it fulfills the customer's order.
   * The SQL database is updated to reflect the remaining quantity.
   * Once the update goes through, it shows the customer the total cost of their purchase.

- - -

* [Watch demo #1](/bamazon-customer.mov).

- - -

### Demonstration #2: Manager View

* Created a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

    * Exit Program

  * If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, the app lists all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, the app displays a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, the app allows the manager to add a completely new product to the store.

  * If a manager selects `Exit Program`, the app allows the manager to exit app and close database connection.

- - -

* [Watch demo #2](/bamazon-manager.mov).

- - -

### Demonstration #3: Supervisor View

1. Created new MySQL table called `departments`. The table includes the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

2. Modified the products table so that there's a product_sales column and modified the `bamazonCustomer.js` app so that this value is updated with each individual products total revenue from each sale.

3. Modified the `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   * The app still updates the inventory listed in the `products` column.

4. Created another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

   * Exit Program

5. When a supervisor selects `View Product Sales by Department`, the app displays a summarized table in the terminal/bash window like below.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

6. The `total_profit` column is calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` is not stored in any database. The custom ALIAS, GROUP BY, and JOINS were used.
- - -

* [Watch demo #3](/bamazon-supervisor.mov).

- - -