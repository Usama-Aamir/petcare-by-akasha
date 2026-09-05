"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Booking = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  pet_name: string | null;
  pet_species: string | null;
  preferred_date: string;
  preferred_time: string;
  status: string;
  notes: string | null;
  created_at: string;
};

const BOOKING_STATUSES = ["requested", "confirmed", "completed", "cancelled"];

const statusColors: Record<string, string> = {
  requested: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const speciesLabels: Record<string, string> = {
  dog: "Dog",
  cat: "Cat",
  small_pet: "Small Pet",
};

export default function BookingsManager() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [updating, setUpdating] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selected) return;
    setUpdating(true);
    await supabase.from("bookings").update({ status: newStatus }).eq("id", selected.id);
    const updated = { ...selected, status: newStatus };
    setSelected(updated);
    setBookings(bookings.map((b) => (b.id === updated.id ? updated : b)));
    setUpdating(false);
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  if (loading) {
    return <p className="py-8 text-center text-navy/40">Loading bookings...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-sage-deep">Bookings</h1>
      <p className="mt-1 text-sm text-navy/60">{bookings.length} total bookings</p>

      {/* Filter tabs */}
      <div className="mt-4 flex gap-2">
        {["all", ...BOOKING_STATUSES].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
              filter === f ? "bg-sage-deep text-cream" : "bg-white text-sage-deep hover:bg-sage-deep/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Booking list */}
        <div className="rounded-2xl bg-white shadow-sm">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-navy/40">No bookings found</p>
          ) : (
            <div className="divide-y divide-sage-deep/5">
              {filtered.map((booking) => (
                <button
                  key={booking.id}
                  onClick={() => setSelected(booking)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-sage-deep/5 ${
                    selected?.id === booking.id ? "bg-sage-deep/5" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-navy">{booking.customer_name}</p>
                    <p className="text-xs text-navy/50">
                      {speciesLabels[booking.pet_species || ""] || "Pet"} · {booking.preferred_date} · {booking.preferred_time}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColors[booking.status] || "bg-gray-100"}`}>
                    {booking.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Booking detail */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          {!selected ? (
            <p className="py-8 text-center text-sm text-navy/40">Select a booking to view details</p>
          ) : (
            <div>
              <h2 className="text-lg font-bold text-sage-deep">Booking Details</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Customer</span>
                  <span className="font-semibold text-navy">{selected.customer_name}</span>
                </div>
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Phone</span>
                  <span className="font-semibold text-navy">{selected.customer_phone}</span>
                </div>
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Address</span>
                  <span className="font-semibold text-navy text-right max-w-[60%]">{selected.customer_address}</span>
                </div>
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Pet</span>
                  <span className="font-semibold text-navy">
                    {speciesLabels[selected.pet_species || ""] || "—"}
                    {selected.pet_name && ` — ${selected.pet_name}`}
                  </span>
                </div>
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Date</span>
                  <span className="font-semibold text-navy">
                    {new Date(selected.preferred_date).toLocaleDateString("en-PK", { weekday: "short", day: "numeric", month: "short" })}
                  </span>
                </div>
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Time</span>
                  <span className="font-semibold text-navy">{selected.preferred_time}</span>
                </div>
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Requested</span>
                  <span className="font-semibold text-navy">{new Date(selected.created_at).toLocaleDateString()}</span>
                </div>
                {selected.notes && (
                  <div className="border-b border-sage-deep/10 pb-2">
                    <span className="text-navy/60">Notes</span>
                    <p className="mt-1 font-semibold text-navy">{selected.notes}</p>
                  </div>
                )}
              </div>

              {/* Status changer */}
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-bold text-sage-deep">Change Status</label>
                <div className="flex flex-wrap gap-2">
                  {BOOKING_STATUSES.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={updating || selected.status === status}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                        selected.status === status
                          ? `${statusColors[status]} ring-2 ring-offset-1`
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      } disabled:opacity-50`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
