const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// connection URL
const url = "mongodb://localhost:27017";

//Database name
const dbName = "fruitsDB";

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the server
client.connect((err) => {
    assert.equal(null, err);
    console.log("Connection to server is successful");

    const db = client.db(dbName);

    client.close();
});