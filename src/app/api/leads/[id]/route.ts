import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectDB from "@/app/lib/mongodb";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const db = await connectDB();
    await db.collection("leads").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: body }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const db = await connectDB();
    await db.collection("leads").deleteOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
