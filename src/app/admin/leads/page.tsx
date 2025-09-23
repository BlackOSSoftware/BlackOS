"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save, Search } from "lucide-react";
import Button from "@/app/components/Reuse/button";

type Lead = {
  _id?: string;
  name: string;
  phone: string;
  description?: string;
  source: "Justdial" | "Personal" | "Other";
  handler: "Anas" | "Aman";
  status: string;
  followUp: string;
  sow: "Yes" | "No";
  meetingSchedule?: string;
  price?: string;
  terms?: { [key: string]: string };
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState<Partial<Lead>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Fetch leads
  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (Array.isArray(data)) setLeads(data);
        else setLeads([]);
      });
  }, []);

  const handleChange = <K extends keyof Lead>(field: K, value: Lead[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveLead = async () => {
    if (!form.name || !form.phone) return;

    if (editId) {
      await fetch(`/api/leads/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({});
    setEditId(null);

    const res = await fetch("/api/leads");
    setLeads(await res.json());
  };

  const editLead = (lead: Lead) => {
    setForm(lead);
    setEditId(lead._id || null);
  };

  const deleteLead = async (id: string) => {
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l._id !== id));
  };

  // filter leads by search
  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      (l.description && l.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 bg-[var(--color-black)] min-h-screen text-[var(--color-white)]">
      <motion.h1
        className="text-2xl font-bold text-[var(--color-primary)] mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Leads Management
      </motion.h1>

      {/* Form */}
      <div className="bg-[#111] p-6 rounded-xl shadow-lg mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Customer Name"
            value={form.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:border-[var(--color-primary)] outline-none w-full"
          />
          <input
            placeholder="Phone"
            value={form.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:border-[var(--color-primary)] outline-none w-full"
          />
          <input
            placeholder="Description"
            value={form.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:border-[var(--color-primary)] outline-none w-full"
          />
          <select
            value={form.source || ""}
            onChange={(e) =>
              handleChange("source", e.target.value as Lead["source"])
            }
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:border-[var(--color-primary)] outline-none w-full"
          >
            <option value="">Select Source</option>
            <option value="Justdial">Justdial</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={form.handler || ""}
            onChange={(e) =>
              handleChange("handler", e.target.value as Lead["handler"])
            }
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:border-[var(--color-primary)] outline-none w-full"
          >
            <option value="">Select Handler</option>
            <option value="Anas">Anas</option>
            <option value="Aman">Aman</option>
          </select>
          <select
            value={form.status || ""}
            onChange={(e) =>
              handleChange("status", e.target.value as Lead["status"])
            }
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:border-[var(--color-primary)] outline-none w-full"
          >
            <option value="">Select Status</option>
            <option value="NPC">NPC not pickup call</option>
            <option value="unreachable">Unreachable</option>
          </select>

          <input
            placeholder="Follow Up"
            value={form.followUp || ""}
            onChange={(e) => handleChange("followUp", e.target.value)}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:border-[var(--color-primary)] outline-none w-full"
          />
          <select
            value={form.sow || ""}
            onChange={(e) => handleChange("sow", e.target.value as "Yes" | "No")}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:border-[var(--color-primary)] outline-none w-full"
          >
            <option value="">SOW?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input
            type="datetime-local"
            placeholder="Meeting Schedule"
            value={form.meetingSchedule || ""}
            onChange={(e) => handleChange("meetingSchedule", e.target.value)}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:border-[var(--color-primary)] outline-none w-full"
          />

          <input
            placeholder="Final Price"
            value={form.price || ""}
            onChange={(e) => handleChange("price", e.target.value)}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 focus:border-[var(--color-primary)] outline-none w-full"
          />
        </div>

        {/* <button
          onClick={saveLead}
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition"
        >
          {editId ? <Save size={18} /> : <Plus size={18} />}
          {editId ? "Update Lead" : "Add Lead"}
        </button> */}
        <Button onClick={saveLead} className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)]  ">
        {editId ? <Save size={18} /> : <Plus size={18} />}
          {editId ? "Update Lead" : "Add Lead"}
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 mb-4 bg-[#111] p-3 rounded-lg">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by name or description or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none flex-1 text-white"
        />
      </div>

      {/* Table for md+ */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg text-sm">
          <thead className="bg-[#222] text-[var(--color-highlight)]">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Description</th>
              <th className="p-2">Source</th>
              <th className="p-2">Handler</th>
              <th className="p-2">Status</th>
              <th className="p-2">Follow Up</th>
              <th className="p-2">SOW</th>
              <th className="p-2">Price</th>
              <th className="p-2">Meeting</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead._id} className="border-t border-gray-700">
                <td className="p-2">{lead.name}</td>
                <td className="p-2">{lead.phone}</td>
                <td className="p-2">{lead.description}</td>
                <td className="p-2">{lead.source}</td>
                <td className="p-2">{lead.handler}</td>
                <td className="p-2">{lead.status}</td>
                <td className="p-2">{lead.followUp}</td>
                <td className="p-2">{lead.sow}</td>
                <td className="p-2">{lead.price}</td>
                <td className="p-2">{lead.meetingSchedule}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => editLead(lead)}
                    className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteLead(lead._id!)}
                    className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card/Grid for sm */}
      <div className="grid md:hidden gap-4">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <div
              key={lead._id}
              className="bg-[#111] p-4 rounded-lg border border-gray-700"
            >
              <h3 className="text-lg font-semibold">{lead.name}</h3>
              <p className="text-gray-400">📞 {lead.phone}</p>
              <p>Description: {lead.description}</p>
              <p>Source: {lead.source}</p>
              <p>Handler: {lead.handler}</p>
              <p>Status: {lead.status}</p>
              <p>Follow Up: {lead.followUp}</p>
              <p>SOW: {lead.sow}</p>
              <p>Meeting: {lead.meetingSchedule}</p>
              <p>Price: {lead.price}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => editLead(lead)}
                  className="flex-1 p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => deleteLead(lead._id!)}
                  className="flex-1 p-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No leads found.</p>
        )}
      </div>
    </div>
  );
}
