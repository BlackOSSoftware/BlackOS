import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectDB();
    const leads = await db.collection("leads").find({}).toArray();
    return NextResponse.json(leads || []); // ✅ always return an array
  } catch (error) {
    return NextResponse.json([], { status: 500 }); // ✅ return [] instead of error object
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await connectDB();
    const result = await db.collection("leads").insertOne(body);
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add lead" }, { status: 500 });
  }
}
