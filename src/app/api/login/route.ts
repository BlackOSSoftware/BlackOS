import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import connectDB from "@/app/lib/mongodb";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = LoginSchema.parse(body);

    const db = await connectDB();
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (err: unknown) {
  if (err instanceof Error) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
}
}