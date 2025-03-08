import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI ;
 // Replace with your DB name

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) return { client: cachedClient, db: cachedDb };

  const client = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db("test");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
