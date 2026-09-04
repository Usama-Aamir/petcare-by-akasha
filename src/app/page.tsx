import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const whyUsFeatures = [
  {
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 8c-6 0-12 4-12 12 0 4 2 7 5 9v7h14v-7c3-2 5-5 5-9 0-8-6-12-12-12z" />
        <path d="M20 36h8" />
      </svg>
    ),
    title: "Vet Comes To You",
    desc: "No stressful car rides or waiting rooms. Our vet visits your home, where your pet feels safe.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 12v12l8 4" />
      </svg>
    ),
    title: "Flexible Scheduling",
    desc: "Pick a date and time that works for you. Request a visit in just a few taps.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 36l8-8m0 0l8-8m-8 8l-4 4m12-12l4-4M8 40h32" />
        <circle cx="36" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    title: "Transparent Pricing",
    desc: "Starting prices shown upfront before you book. No surprise fees or hidden charges.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6l3 6 6 1-4.5 4.5 1 6.5L24 21l-5.5 3 1-6.5L15 13l6-1z" />
        <path d="M12 38c0-4 4-6 12-6s12 2 12 6" />
      </svg>
    ),
    title: "Licensed Vets",
    desc: "Our vets are PVMC-registered professionals with real clinical experience in Pakistan.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 24c0-8 6-14 16-14s16 6 16 14" />
        <path d="M8 24c0 8 6 14 16 14s16-6 16-14" />
        <circle cx="24" cy="24" r="5" />
      </svg>
    ),
    title: "All Pets Welcome",
    desc: "Dogs, cats, and small pets — birds, rabbits, hamsters. We care for them all.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4l16 6v12c0 10-7 16-16 22C14 38 8 32 8 22V10z" />
        <path d="M18 22l4 4 8-8" />
      </svg>
    ),
    title: "Cash On Visit",
    desc: "Pay in cash when the vet arrives. No online payment or card needed for booking.",
  },
];

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default async function HomePage() {
  const supabase = await createClient();
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("id, name, description, price, image_url")
    .eq("is_active", true)
    .order("created_at", { ascending: true })
    .limit(6);
  return (
    <div className="min-h-screen bg-cream">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-cream">
        {/* Organic blob shapes */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sage opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-sage-light opacity-25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-cream-alt opacity-60 blur-2xl" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:py-28">
          <Image
            src="/logo/logo-primary.svg"
            alt="Pet Care by Akasha"
            width={220}
            height={240}
            priority
            className="h-auto w-44 sm:w-56"
          />

          <h1 className="mt-6 max-w-2xl text-3xl font-bold leading-tight text-sage-deep sm:text-5xl">
            Pet shop &amp; house-call vet
            <span className="block text-sage-light">in Lahore</span>
          </h1>

          <p className="mt-4 max-w-xl text-base text-navy/70 sm:text-lg">
            Quality pet products delivered nationwide, and a licensed vet who
            comes to your home — for dogs, cats, and small pets.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="rounded-full bg-sage-deep px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-sage-light"
            >
              Shop Products
            </Link>
            <Link
              href="/book-a-vet"
              className="rounded-full border-2 border-sage-deep px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-sage-deep transition-colors hover:bg-sage-deep hover:text-cream"
            >
              Book a Vet
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY HOUSE-CALL VET ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-sage-deep sm:text-3xl">
            Why House-Call Vet
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-sage-light" />

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyUsFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center"
              >
                <div className="text-sage-deep">{feature.icon}</div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-navy/60">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-sage-deep sm:text-3xl">
            Featured Products
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-sage-light" />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {featuredProducts?.map((product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="mb-3 aspect-square w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="mb-3 aspect-square w-full rounded-xl bg-cream-alt" />
                )}
                <h3 className="text-sm font-semibold text-navy">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-navy/50">{product.description}</p>
                <p className="mt-2 text-sm font-bold text-sage-deep">
                  {formatPrice(product.price)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-block rounded-full bg-sage-deep px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-sage-light"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="bg-sage-deep py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-cream sm:text-3xl">
            Need a vet visit?
          </h2>
          <p className="mt-3 text-cream/70">
            Book a house-call appointment in minutes. Cash on visit — no online
            payment required.
          </p>
          <Link
            href="/book-a-vet"
            className="mt-6 inline-block rounded-full bg-cream px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-sage-deep transition-colors hover:bg-white"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
