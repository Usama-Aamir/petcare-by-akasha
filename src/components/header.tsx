"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";

export default function Header() {
  const { totalItems, isHydrated } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-sage/30 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold lowercase tracking-tight text-sage-deep">
            petcare
          </span>
          <span className="font-script text-sm text-sage-light">by akasha</span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="/shop"
            className="text-sm font-medium text-navy/70 transition-colors hover:text-sage-deep"
          >
            Shop
          </Link>
          <Link
            href="/book-a-vet"
            className="text-sm font-medium text-navy/70 transition-colors hover:text-sage-deep"
          >
            Book a Vet
          </Link>
          <Link
            href="/our-vets"
            className="text-sm font-medium text-navy/70 transition-colors hover:text-sage-deep"
          >
            Our Vets
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-navy/70 transition-colors hover:text-sage-deep"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-navy/70 transition-colors hover:text-sage-deep"
          >
            Contact
          </Link>
        </nav>

        <Link
          href="/cart"
          className="relative flex items-center gap-1.5 rounded-full bg-sage-deep px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-sage-light"
          aria-label="Cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="hidden sm:inline">Cart</span>
          {isHydrated && totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
