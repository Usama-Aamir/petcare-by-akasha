import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";
import ChatBubble from "@/components/chat-bubble";
import EmergencyButton from "@/components/emergency-button";
import Header from "@/components/header";
import { CartProvider } from "@/components/cart-context";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Pet Care by Akasha",
  description:
    "Pet shop and house-call vet booking for dogs, cats, and small pets in Lahore, Pakistan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${caveat.variable} font-sans`}>
        <CartProvider>
          <Header />
          {children}
          <ChatBubble />
          <EmergencyButton />
        </CartProvider>
      </body>
    </html>
  );
}
