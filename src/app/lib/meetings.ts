// lib/meetings.ts
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export type Meeting = {
  id: string;
  leadId: string;
  datetime: string; // ISO string
  completed: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "meetings.json");

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (err) {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

export async function readMeetings(): Promise<Meeting[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    return JSON.parse(raw) as Meeting[];
  } catch {
    return [];
  }
}

export async function writeMeetings(meetings: Meeting[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(meetings, null, 2), "utf8");
}

export function createMeetingObj(leadId: string, datetime: string, notes?: string): Meeting {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    leadId,
    datetime,
    completed: false,
    notes,
    createdAt: now,
    updatedAt: now,
  };
}
