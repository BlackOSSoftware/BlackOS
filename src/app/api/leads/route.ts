// src/app/api/leads/route.ts
import { connectDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectDB();
    const leads = await db.collection("leads").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(leads || []);
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Basic server-side validation example
    if (!body?.name || !body?.phone) {
      return NextResponse.json({ error: "Name and phone required" }, { status: 400 });
    }

    const db = await connectDB();
    const result = await db.collection("leads").insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Return newly created document id + body (not querying again to keep it simple)
    return NextResponse.json({ _id: result.insertedId, ...body }, { status: 201 });
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
