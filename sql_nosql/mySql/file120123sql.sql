DROP TABLE IF EXISTS webApp.products;
DROP TABLE IF EXISTS webApp.customers;
DROP TABLE IF EXISTS webApp.orders;

CREATE TABLE webApp.products(
   id INT NOT NULL,
    name VARCHAR(255),
    price FLOAT,
    PRIMARY KEY (id)
);




INSERT INTO webApp.Products
VALUES(1, 'Pen', 1.20);

INSERT INTO webApp.Products(id, name)
VALUES(2, 'pencil');

/* Read and search in webApp.Products  */

SELECT price, name FROM webApp.Products;

SELECT price, name FROM webApp.Products
WHERE id=1;

UPDATE webApp.Products 
SET price=0.2
WHERE ID=2;

ALTER TABLE webApp.Products
ADD stock INTEGER;


UPDATE webApp.Products
SET stock=32
WHERE ID=1;

UPDATE webApp.Products
SET stock=12
WHERE ID=2;

/* DELETE FROM webApp.Products
WHERE ID=2; */
CREATE TABLE webApp.customers(
    id INT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    address VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE webApp.orders(
    id INT NOT NULL,
    order_number INT,
    customer_id INT,
    product_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


INSERT INTO webApp.customers(id, first_name, last_name, address)
VALUES(1, "Shammah", "Freisleben", " Hugo-Cassirer-Str 11"),
      (2, "Linda", "Ochwada", " Hugo-Cassirer-Str 11");


INSERT INTO webApp.orders
VALUES(1, 4556, 2, 1);


SELECT webApp.orders.order_number, webApp.customers.first_name, webApp.customers.last_name, webApp.customers.address
FROM webApp.orders
INNER JOIN webApp.customers ON webApp.orders.customer_id  = webApp.customers.id;


/* challenge, join the order and the product the person is related tto,*/

SELECT webApp.orders.order_number, webApp.products.name, webApp.products.price, webApp.products.stock
FROM webApp.orders
INNER JOIN webApp.products ON webApp.products.id = webApp.orders.product_id;

/* display table */
SELECT * FROM webApp.Products;
SELECT * FROM webApp.customers;
SELECT * FROM webApp.orders;

