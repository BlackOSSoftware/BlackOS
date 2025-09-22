// src/lib/connectDB.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;
if (!uri) throw new Error("❌ Please add your Mongo URI to .env.local");

let client: MongoClient;
let db: Db;

export default async function connectDB(): Promise<Db> {
  if (db) return db; // reuse cached db

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  db = client.db("blackos"); 
  return db;
}
