"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const SPECIES_OPTIONS = [
  { value: "dog", label: "Dog", emoji: "🐕" },
  { value: "cat", label: "Cat", emoji: "🐈" },
  { value: "small_pet", label: "Small Pet", emoji: "🐹" },
];

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    pet_species: "",
    pet_name: "",
    preferred_date: "",
    preferred_time: "",
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    notes: "",
  });

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const today = new Date().toISOString().split("T")[0];

  const canProceed = () => {
    if (step === 1) return form.pet_species !== "";
    if (step === 2) return form.preferred_date !== "" && form.preferred_time !== "";
    if (step === 3) return form.customer_name && form.customer_phone && form.customer_address;
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    const { error: insertError } = await supabase.from("bookings").insert({
      pet_species: form.pet_species || null,
      pet_name: form.pet_name || null,
      preferred_date: form.preferred_date,
      preferred_time: form.preferred_time,
      customer_name: form.customer_name,
      customer_phone: form.customer_phone,
      customer_address: form.customer_address,
      notes: form.notes || null,
    });
    setSubmitting(false);
    if (insertError) {
      setError("Something went wrong. Please try again or call us directly.");
      return;
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-light/20">
          <svg className="h-10 w-10 text-sage-deep" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-sage-deep">Booking Requested!</h2>
        <p className="mt-3 text-navy/70">
          We&apos;ve received your request for a house-call vet visit on{" "}
          <span className="font-semibold text-sage-deep">
            {new Date(form.preferred_date).toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long" })}
          </span>{" "}
          at <span className="font-semibold text-sage-deep">{form.preferred_time}</span>.
        </p>
        <p className="mt-2 text-navy/70">
          Our team will call you on <span className="font-semibold">{form.customer_phone}</span> to confirm the appointment.
          Payment is cash-on-visit — no online payment needed.
        </p>
        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-sage-deep px-8 py-3 text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-sage-light"
        >
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all ${
              s <= step ? "bg-sage-deep" : "bg-sage-deep/20"
            }`}
            style={{ width: s === step ? "40px" : "24px" }}
          />
        ))}
      </div>

      {/* Step 1: Pet Info */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-sage-deep">Tell us about your pet</h2>
            <p className="mt-1 text-sm text-navy/60">What kind of pet needs a vet visit?</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {SPECIES_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update("pet_species", opt.value)}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all ${
                  form.pet_species === opt.value
                    ? "border-sage-deep bg-sage-deep/5"
                    : "border-transparent bg-white hover:border-sage-light"
                }`}
              >
                <span className="text-4xl">{opt.emoji}</span>
                <span className="text-sm font-semibold text-sage-deep">{opt.label}</span>
              </button>
            ))}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-sage-deep">
              Pet name <span className="font-normal text-navy/40">(optional)</span>
            </label>
            <input
              type="text"
              value={form.pet_name}
              onChange={(e) => update("pet_name", e.target.value)}
              placeholder="e.g. Whiskers"
              className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-sage-deep"
            />
          </div>
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-sage-deep">Pick a date & time</h2>
            <p className="mt-1 text-sm text-navy/60">Choose when you&apos;d like the vet to visit</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-sage-deep">Preferred date</label>
            <input
              type="date"
              min={today}
              value={form.preferred_date}
              onChange={(e) => update("preferred_date", e.target.value)}
              className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-sage-deep"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-sage-deep">Preferred time slot</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => update("preferred_time", slot)}
                  className={`rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-all ${
                    form.preferred_time === slot
                      ? "border-sage-deep bg-sage-deep text-cream"
                      : "border-sage-deep/20 bg-white text-sage-deep hover:border-sage-light"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Contact Info */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-sage-deep">Your contact details</h2>
            <p className="mt-1 text-sm text-navy/60">Where should the vet come?</p>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-sage-deep">Full name</label>
            <input
              type="text"
              value={form.customer_name}
              onChange={(e) => update("customer_name", e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-sage-deep"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-sage-deep">Phone number</label>
            <input
              type="tel"
              value={form.customer_phone}
              onChange={(e) => update("customer_phone", e.target.value)}
              placeholder="03XX XXXXXXX"
              className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-sage-deep"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-sage-deep">Address in Lahore</label>
            <textarea
              value={form.customer_address}
              onChange={(e) => update("customer_address", e.target.value)}
              placeholder="House #, street, area, landmark"
              rows={3}
              className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-sage-deep"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-sage-deep">
              Notes <span className="font-normal text-navy/40">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Any symptoms, concerns, or special requests"
              rows={2}
              className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-sage-deep"
            />
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div className="space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-sage-deep">Review your booking</h2>
            <p className="mt-1 text-sm text-navy/60">Please confirm the details below</p>
          </div>
          <div className="rounded-2xl bg-white p-5 space-y-3">
            <div className="flex justify-between border-b border-sage-deep/10 pb-2">
              <span className="text-sm text-navy/60">Pet</span>
              <span className="text-sm font-semibold text-sage-deep">
                {SPECIES_OPTIONS.find((s) => s.value === form.pet_species)?.label}
                {form.pet_name && ` — ${form.pet_name}`}
              </span>
            </div>
            <div className="flex justify-between border-b border-sage-deep/10 pb-2">
              <span className="text-sm text-navy/60">Date</span>
              <span className="text-sm font-semibold text-sage-deep">
                {form.preferred_date && new Date(form.preferred_date).toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long" })}
              </span>
            </div>
            <div className="flex justify-between border-b border-sage-deep/10 pb-2">
              <span className="text-sm text-navy/60">Time</span>
              <span className="text-sm font-semibold text-sage-deep">{form.preferred_time}</span>
            </div>
            <div className="flex justify-between border-b border-sage-deep/10 pb-2">
              <span className="text-sm text-navy/60">Name</span>
              <span className="text-sm font-semibold text-sage-deep">{form.customer_name}</span>
            </div>
            <div className="flex justify-between border-b border-sage-deep/10 pb-2">
              <span className="text-sm text-navy/60">Phone</span>
              <span className="text-sm font-semibold text-sage-deep">{form.customer_phone}</span>
            </div>
            <div className="flex justify-between border-b border-sage-deep/10 pb-2">
              <span className="text-sm text-navy/60">Address</span>
              <span className="text-sm font-semibold text-sage-deep text-right max-w-[60%]">{form.customer_address}</span>
            </div>
            {form.notes && (
              <div className="flex justify-between">
                <span className="text-sm text-navy/60">Notes</span>
                <span className="text-sm font-semibold text-sage-deep text-right max-w-[60%]">{form.notes}</span>
              </div>
            )}
          </div>
          <div className="rounded-xl bg-sage-light/10 p-4 text-center">
            <p className="text-sm text-sage-deep">
              <span className="font-bold">Cash on visit</span> — pay the vet directly when they arrive. No online payment needed.
            </p>
          </div>
          {error && <p className="text-center text-sm font-semibold text-red-600">{error}</p>}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="rounded-full border-2 border-sage-deep px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-sage-deep transition-colors hover:bg-sage-deep hover:text-cream"
          >
            Back
          </button>
        ) : (
          <div />
        )}
        {step < 4 ? (
          <button
            onClick={() => canProceed() && setStep(step + 1)}
            disabled={!canProceed()}
            className="rounded-full bg-sage-deep px-8 py-2.5 text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-sage-light disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-full bg-sage-deep px-8 py-2.5 text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-sage-light disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Confirm Booking"}
          </button>
        )}
      </div>
    </div>
  );
}
