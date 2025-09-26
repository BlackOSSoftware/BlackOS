import { NextResponse } from "next/server";
import { createMeetingObj, readMeetings, writeMeetings } from "@/app/lib/meetings";
import { z } from "zod";

const UpdateMeetingSchema = z.object({
  datetime: z.string().optional(),
  completed: z.boolean().optional(),
  notes: z.string().optional(),
  nextMeetingDatetime: z.string().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = UpdateMeetingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const meetings = await readMeetings();
    const idx = meetings.findIndex((m) => m.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    const meeting = meetings[idx];
    if (parsed.data.datetime !== undefined) meeting.datetime = parsed.data.datetime;
    if (parsed.data.completed !== undefined) meeting.completed = parsed.data.completed;
    if (parsed.data.notes !== undefined) meeting.notes = parsed.data.notes;
    meeting.updatedAt = new Date().toISOString();
    meetings[idx] = meeting;

    let nextMeeting = null;
    if (parsed.data.nextMeetingDatetime) {
      nextMeeting = createMeetingObj(meeting.leadId, parsed.data.nextMeetingDatetime);
      meetings.push(nextMeeting);
    }

    await writeMeetings(meetings);

    return NextResponse.json({ meeting, nextMeeting }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const meetings = await readMeetings();
    const filtered = meetings.filter((m) => m.id !== id);
    await writeMeetings(filtered);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete error", err);
    return NextResponse.json({ ok: false, error: "Failed to delete" }, { status: 500 });
  }
}
