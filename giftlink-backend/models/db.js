// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    const client = new MongoClient(url);      

    try {
        await client.connect();
        console.log("Successfully connected to MongoDB");
    
        const db = client.db("giftdb");
    
        return client; 
      } catch (error) {
        console.error("Connection to MongoDB failed", error);
        process.exit(1); 
      }

}

module.exports = connectToDatabase;
