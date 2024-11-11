// mongoClient.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let client;

if (uri) {
  client = new MongoClient(uri);
}

export { client };
