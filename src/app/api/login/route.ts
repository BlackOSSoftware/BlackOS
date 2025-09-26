import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDB } from "@/app/lib/mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const LoginSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { identifier, password } = LoginSchema.parse(body);

    const db = await connectDB();

    const user = await db.collection("users").findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Set token in HTTP-only cookie
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return NextResponse.json({ success: true, token, user: { email: user.email, username: user.username } });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
