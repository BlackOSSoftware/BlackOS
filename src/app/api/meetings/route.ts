// app/api/meetings/route.ts
import { createMeetingObj, readMeetings, writeMeetings } from "@/app/lib/meetings";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateMeetingSchema = z.object({
  leadId: z.string(),
  datetime: z.string(), // ISO string expected
  notes: z.string().optional(),
});

export async function GET() {
  const meetings = await readMeetings();
  return NextResponse.json(meetings);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CreateMeetingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const meeting = createMeetingObj(parsed.data.leadId, parsed.data.datetime, parsed.data.notes);
    const meetings = await readMeetings();
    meetings.push(meeting);
    await writeMeetings(meetings);

    return NextResponse.json(meeting, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
