import BookingForm from "@/components/booking-form";

export default function BookAVetPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-sage-deep py-12 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="text-3xl font-bold text-cream sm:text-4xl">Book a House-Call Vet</h1>
          <p className="mt-3 text-cream/80">
            A licensed vet comes to your home in Lahore — no stressful car rides or waiting rooms.
            Cash on visit, no online payment needed.
          </p>
        </div>
      </section>
      <BookingForm />
    </div>
  );
}
