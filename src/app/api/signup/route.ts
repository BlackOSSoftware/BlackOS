// src/app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import clientPromise from "@/app/lib/mongodb"; // your clientPromise

const SignupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

// Helpful GET so accidental browser GET doesn't just show 405 in dev logs
export async function GET() {
  return NextResponse.json(
    { message: "This endpoint accepts POST requests for user signup. Use POST with JSON body." },
    { status: 200 }
  );
}

export async function POST(req: Request) {
  try {
    // log for dev debugging
    console.log("[/api/signup] POST called");

    const body = await req.json();
    const { username, email, password } = SignupSchema.parse(body);

    const client = await clientPromise;
    const dbName = "blackos";
    const db = client.db(dbName);

    // ensure index (safe to run, will be noop if exists)
    await db.collection("users").createIndex({ email: 1 }, { unique: true });

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "User registered successfully", id: result.insertedId });
  } catch (err: unknown) {
  if (err instanceof Error) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
}

}
