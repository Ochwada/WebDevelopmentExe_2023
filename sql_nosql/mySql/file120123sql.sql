CREATE TABLE webApp.Products(
    id int not null,
    name varchar(255),
    price float,
    primary key (id)
);

INSERT INTO webApp.Products
VALUES(1, 'Pen', 1.20);

INSERT INTO webApp.Products(id, name)
VALUES(2, 'pencil');

SELECT * FROM webApp.Products;

/* Read and search in webApp.Products  */

