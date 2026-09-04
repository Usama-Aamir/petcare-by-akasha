"use client";

import Link from "next/link";

export default function ChatBubble() {
  return (
    <Link
      href="/ask-a-vet"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-sage-deep px-5 py-3 text-sm font-semibold text-cream shadow-lg transition-colors hover:bg-sage"
    >
      Ask a Vet
    </Link>
  );
}
