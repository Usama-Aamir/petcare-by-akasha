"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-context";

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice, isHydrated } =
    useCart();

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <h1 className="text-2xl font-bold uppercase tracking-wide text-sage-deep">
            Cart
          </h1>
          <div className="mt-8 h-40 animate-pulse rounded-2xl bg-white/60" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-sage-deep sm:text-3xl">
          Cart
        </h1>
        <div className="mt-2 h-1 w-20 rounded-full bg-sage-light" />

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <svg viewBox="0 0 48 48" className="h-16 w-16 text-sage/40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="42" r="2" />
              <circle cx="36" cy="42" r="2" />
              <path d="M2 4h8l6 30h24l4-20H14" />
            </svg>
            <p className="mt-4 text-sm font-medium text-navy/50">
              Your cart is empty.
            </p>
            <Link
              href="/shop"
              className="mt-6 rounded-full bg-sage-deep px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-sage-light"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-4 text-sm text-navy/50">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>

            {/* Line items */}
            <div className="mt-6 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-cream-alt" />
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-navy">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-bold text-sage-deep">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-alt text-sm font-bold text-navy transition-colors hover:bg-sage/20"
                      aria-label="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-navy">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-alt text-sm font-bold text-navy transition-colors hover:bg-sage/20"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="hidden w-24 text-right sm:block">
                    <p className="text-sm font-bold text-navy">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-navy/30 transition-colors hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove item"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary + checkout */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-cream-alt pb-4">
                <span className="text-sm font-medium text-navy/70">
                  Subtotal
                </span>
                <span className="text-sm font-bold text-navy">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-cream-alt py-4">
                <span className="text-sm font-medium text-navy/70">
                  Delivery
                </span>
                <span className="text-sm font-medium text-navy/50">
                  Calculated at checkout
                </span>
              </div>
              <div className="flex items-center justify-between pt-4">
                <span className="text-base font-bold text-navy">Total</span>
                <span className="text-lg font-bold text-sage-deep">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block rounded-full bg-sage-deep py-3.5 text-center text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-sage-light"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="mt-3 block text-center text-sm font-medium text-navy/50 transition-colors hover:text-sage-deep"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
