import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/app/lib/mongodb";

const SignupSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = SignupSchema.parse(body);

    const db = await connectDB();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      id: result.insertedId,
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
