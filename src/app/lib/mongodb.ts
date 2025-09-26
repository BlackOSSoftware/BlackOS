// app/lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
  if (db) return db; // ✅ reuse cached connection

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  db = client.db("blackos"); // ✅ change to your DB name
  return db;
}
