import mongoose, { Schema, Document } from "mongoose";
import { string } from "zod";

export interface ILead extends Document {
  name: string;
  phone: string;
  leadSource: string;
  handler: string;
  response: string;
  notes?: string;
  sowGiven: boolean;
  finalPrice: number;
  terms: number;
  payments: number[];
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    designation: { type: String, required: true },
    leadSource: { type: String, required: true },
    handler: { type: String, required: true },
    response: { type: String, required: true },
    notes: { type: String },
    sowGiven: { type: Boolean, default: false },
    finalPrice: { type: Number, default: 0 },
    terms: { type: Number, default: 3 },
    meetingSchedule: { type: String },
    payments: [{ type: Number, default: 0 }],
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
