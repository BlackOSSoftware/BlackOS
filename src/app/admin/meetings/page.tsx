// app/admin/meetings/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/app/components/Reuse/button"; // adjust path if needed
import { Plus, Edit, Trash2, Check, Calendar } from "lucide-react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// ------------------ Types ------------------
type Lead = {
  _id: string;
  name: string;
  phone: string;
  // other lead fields optional
  [k: string]: unknown;
};

type Meeting = {
  id: string;
  leadId: string;
  datetime: string; // ISO
  completed: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

// ------------------ Helpers ------------------
const isoToLocalInput = (iso?: string) => {
  if (!iso) return "";
  // convert ISO to "YYYY-MM-DDTHH:MM" for input[type=datetime-local]
  const d = new Date(iso);
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const YYYY = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const DD = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
};

const localInputToISO = (val: string) => {
  if (!val) return "";
  // val like "2025-09-27T14:30"
  const dt = new Date(val);
  return dt.toISOString();
};

const shortDateTime = (iso?: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

// ------------------ Component ------------------
export default function Meetings() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [dtInput, setDtInput] = useState(""); // datetime-local value
  const [notes, setNotes] = useState("");
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [search, setSearch] = useState("");

  // fetch leads and meetings
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [lRes, mRes] = await Promise.all([
          fetch("/api/leads"),
          fetch("/api/meetings"),
        ]);
        const leadsData = await lRes.json();
        const meetingsData = await mRes.json();
        setLeads(Array.isArray(leadsData) ? leadsData : []);
        setMeetings(Array.isArray(meetingsData) ? meetingsData : []);
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // upcoming meetings sorted
  const upcoming = useMemo(() => {
    return [...meetings]
      .filter((m) => !m.completed)
      .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
  }, [meetings]);

  // filtered list based on search (name/phone)
  const filteredMeetings = useMemo(() => {
    if (!search.trim()) return meetings;
    const q = search.toLowerCase();
    // map lead ids to names for quick lookup
    const leadMap = new Map(leads.map((ld) => [ld._id, ld]));
    return meetings.filter((m) => {
      const lead = leadMap.get(m.leadId) as Lead | undefined;
      const leadName = lead?.name?.toLowerCase() ?? "";
      const leadPhone = lead?.phone?.toString() ?? "";
      return (
        leadName.includes(q) ||
        leadPhone.includes(q) ||
        (m.notes && m.notes.toLowerCase().includes(q))
      );
    });
  }, [meetings, search, leads]);

  // open schedule dialog for a lead (or open blank to choose lead from dropdown)
  function openScheduleFor(leadId?: string) {
    setSelectedLeadId(leadId || null);
    setDtInput("");
    setNotes("");
    setEditingMeeting(null);
    setShowSchedule(true);
  }

  // create meeting
  async function createMeeting() {
    if (!selectedLeadId || !dtInput) return alert("Please select lead and date/time");
    try {
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: selectedLeadId, datetime: localInputToISO(dtInput), notes }),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("Create error", err);
        return alert("Failed to create meeting");
      }
      const created: Meeting = await res.json();
      setMeetings((prev) => [...prev, created]);
      setShowSchedule(false);
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  }

  // start editing meeting
  function startEdit(m: Meeting) {
    setEditingMeeting(m);
    setSelectedLeadId(m.leadId);
    setDtInput(isoToLocalInput(m.datetime));
    setNotes(m.notes ?? "");
    setShowSchedule(true);
  }

  // update meeting: supports updating datetime, toggling completed, and creating next meeting
  async function updateMeeting({ createNext = false }: { createNext?: boolean } = {}) {
    if (!editingMeeting) return;
    try {
      const body: Record<string, unknown> = {};
      if (dtInput) body.datetime = localInputToISO(dtInput);
      if (notes !== undefined) body.notes = notes;
      // if creating next meeting we include nextMeetingDatetime
      if (createNext) {
        // prompt or use dtInput as next? For UI we'll ask user to set dtInput + check "create next" checkbox
        const next = prompt("Enter next meeting (YYYY-MM-DDTHH:mm) in your local timezone (leave blank to skip):");
        if (next) body.nextMeetingDatetime = localInputToISO(next);
      }

      const res = await fetch(`/api/meetings/${editingMeeting.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Update error", err);
        return alert("Failed to update meeting");
      }

      const payload = await res.json();
      // payload includes updated meeting and maybe nextMeeting
      // fetch latest meetings or update locally
      // simple approach: re-fetch meetings
      const mRes = await fetch("/api/meetings");
      const mData = await mRes.json();
      setMeetings(Array.isArray(mData) ? mData : []);
      setShowSchedule(false);
      setEditingMeeting(null);
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  }

  // toggle complete
  async function toggleComplete(m: Meeting) {
    try {
      const res = await fetch(`/api/meetings/${m.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !m.completed }),
      });
      if (!res.ok) throw new Error("failed");
      const mRes = await fetch("/api/meetings");
      setMeetings(await mRes.json());
    } catch (err) {
      console.error(err);
      alert("Failed to toggle completion");
    }
  }

  // delete meeting
  async function deleteMeeting(m: Meeting) {
    if (!confirm("Delete this meeting?")) return;
    try {
      const res = await fetch(`/api/meetings/${m.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      setMeetings((prev) => prev.filter((x) => x.id !== m.id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  // derive lead from id
  const leadById = useMemo(() => {
    const map = new Map<string, Lead>();
    for (const l of leads) map.set(l._id, l);
    return map;
  }, [leads]);

  // UI render
  return (
    <div className="p-4 sm:p-6 min-h-screen bg-[var(--color-black)] text-[var(--color-white)]">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold mb-6 text-[var(--color-primary)]"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Meeting Schedules
      </motion.h1>

      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            className="flex-1 md:w-80 p-2 rounded-lg bg-[#111] border border-gray-700 placeholder:text-gray-400 outline-none"
            placeholder="Search by lead name, phone or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={() => openScheduleFor()}
            className="ml-0 md:ml-3"
          >
            <Plus size={16} /> Schedule
          </Button>
          <Button
            onClick={async () => {
              // refresh
              setLoading(true);
              const [lRes, mRes] = await Promise.all([fetch("/api/leads"), fetch("/api/meetings")]);
              setLeads(await lRes.json());
              setMeetings(await mRes.json());
              setLoading(false);
            }}
            className="ml-0 md:ml-3 bg-[var(--color-secondary)]"
          >
            Refresh
          </Button>
        </div>

        <div className="mt-3 md:mt-0">
          <span className="text-sm text-gray-400 mr-3">Upcoming:</span>
          <span className="font-medium">{upcoming.length}</span>
        </div>
      </div>

      {/* Swiper carousel for upcoming */}
      <div className="mb-6">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.1 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
        >
          {upcoming.length === 0 ? (
            <SwiperSlide>
              <div className="p-6 bg-[#111] rounded-xl border border-gray-700 min-h-[140px] flex items-center justify-center">
                No upcoming meetings
              </div>
            </SwiperSlide>
          ) : (
            upcoming.map((m) => {
              const lead = leadById.get(m.leadId);
              return (
                <SwiperSlide key={m.id}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#111] border border-gray-700 min-h-[140px] relative"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{lead?.name ?? "Unknown"}</h3>
                        <p className="text-sm text-gray-400">{lead?.phone}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">{shortDateTime(m.datetime)}</div>
                        <div className="text-xs text-gray-500">{new Date(m.datetime).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-gray-300 line-clamp-2">{m.notes ?? "No notes"}</p>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => startEdit(m)}
                        className="px-3 py-1 rounded-lg bg-[var(--color-primary)] text-black text-sm font-medium"
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => toggleComplete(m)}
                        className="px-3 py-1 rounded-lg bg-[var(--color-success)] text-black text-sm font-medium"
                        title="Mark complete"
                      >
                        <Check size={14} /> {m.completed ? "Unmark" : "Complete"}
                      </button>
                      <button
                        onClick={() => deleteMeeting(m)}
                        className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                      <div className="ml-auto text-xs text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>

      {/* Table (desktop) */}
      <div className="hidden md:block mb-6">
        <div className="overflow-x-auto w-full rounded-lg border border-gray-700">
          <table className="w-full min-w-max text-sm">
            <thead className="bg-[#111] text-left">
              <tr>
                <th className="p-2">Lead</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Date / Time</th>
                <th className="p-2">Notes</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeetings.map((m) => {
                const lead = leadById.get(m.leadId);
                return (
                  <tr key={m.id} className="border-t border-gray-800 hover:bg-[#0b0b0b]">
                    <td className="p-2">{lead?.name ?? "Unknown"}</td>
                    <td className="p-2">{lead?.phone}</td>
                    <td className="p-2">{shortDateTime(m.datetime)}</td>
                    <td className="p-2 max-w-xl">{m.notes ?? "-"}</td>
                    <td className="p-2">{m.completed ? <span className="text-[var(--color-success)] font-medium">Completed</span> : <span className="text-yellow-300">Pending</span>}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => startEdit(m)} className="p-2 rounded bg-[var(--color-primary)] text-black">Edit</button>
                      <button onClick={() => toggleComplete(m)} className="p-2 rounded bg-[var(--color-success)] text-black">{m.completed ? "Unmark" : "Complete"}</button>
                      <button onClick={() => deleteMeeting(m)} className="p-2 rounded bg-red-600">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="grid md:hidden gap-4">
        {filteredMeetings.map((m) => {
          const lead = leadById.get(m.leadId);
          return (
            <motion.div key={m.id} whileHover={{ scale: 1.01 }} className="bg-[#111] p-4 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{lead?.name ?? "Unknown"}</h4>
                  <p className="text-xs text-gray-400">{lead?.phone}</p>
                </div>
                <div className="text-right text-xs">
                  <div>{shortDateTime(m.datetime)}</div>
                  <div className="mt-1">{m.completed ? <span className="text-[var(--color-success)]">Done</span> : <span className="text-yellow-300">Pending</span>}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-300">{m.notes ?? "No notes"}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => startEdit(m)} className="flex-1 p-2 rounded bg-[var(--color-primary)] text-black">Edit</button>
                <button onClick={() => toggleComplete(m)} className="flex-1 p-2 rounded bg-[var(--color-success)] text-black">{m.completed ? "Unmark" : "Complete"}</button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Schedule/Edit Modal (simple slide-over) */}
      {showSchedule && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => { setShowSchedule(false); setEditingMeeting(null); }} />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="relative z-50 w-full max-w-2xl bg-[#0b0b0b] rounded-xl p-6 mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editingMeeting ? "Edit Meeting" : "Schedule Meeting"}</h3>
              <button onClick={() => { setShowSchedule(false); setEditingMeeting(null); }} className="text-gray-400">Close</button>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Lead</label>
                <select
                  className="w-full p-2 rounded bg-[#111] border border-gray-700"
                  value={selectedLeadId ?? ""}
                  onChange={(e) => setSelectedLeadId(e.target.value || null)}
                >
                  <option value="">Select lead</option>
                  {leads.map((ld) => (
                    <option key={ld._id} value={ld._id}>
                      {ld.name} — {ld.phone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  value={dtInput}
                  onChange={(e) => setDtInput(e.target.value)}
                  className="w-full p-2 rounded bg-[#111] border border-gray-700"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-1">Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 rounded bg-[#111] border border-gray-700 min-h-[80px]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              {!editingMeeting ? (
                <Button onClick={createMeeting} className="bg-[var(--color-primary)]">
                  <Calendar size={16} /> Create Meeting
                </Button>
              ) : (
                <>
                  <Button onClick={() => updateMeeting()} className="bg-[var(--color-primary)]">
                    Update Meeting
                  </Button>
                  <Button onClick={() => updateMeeting({ createNext: true })} className="bg-[var(--color-accent)]">
                    Update + Create Next
                  </Button>
                </>
              )}

              <Button onClick={() => { setShowSchedule(false); setEditingMeeting(null); }} className="bg-[#333]">
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="fixed bottom-6 right-6 bg-[#111] px-4 py-2 rounded-lg border border-gray-700 text-sm">Loading…</div>
      )}
    </div>
  );
}
