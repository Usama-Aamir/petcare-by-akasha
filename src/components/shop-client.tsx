"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useCart } from "@/components/cart-context";

export type ShopProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: {
    species: string;
    category: string;
    subcategory: string;
  } | null;
};

export type ShopCategory = {
  species: string;
  category: string;
};

const speciesTabs = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "small_pets", label: "Small Pets" },
];

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export default function ShopClient({
  products,
  categories,
}: {
  products: ShopProduct[];
  categories: ShopCategory[];
}) {
  const { addItem } = useCart();
  const [activeSpecies, setActiveSpecies] = useState("cat");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const availableCategories = useMemo(() => {
    const seen = new Set<string>();
    return categories
      .filter((c) => {
        if (c.species !== activeSpecies) return false;
        const key = `${c.species}:${c.category}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((c) => c.category);
  }, [categories, activeSpecies]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.category || p.category.species !== activeSpecies) return false;
      if (activeCategory && p.category.category !== activeCategory) return false;
      return true;
    });
  }, [products, activeSpecies, activeCategory]);

  const handleAdd = (product: ShopProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-sage-deep sm:text-3xl">
          Shop
        </h1>
        <div className="mt-2 h-1 w-20 rounded-full bg-sage-light" />

        {/* Species tabs */}
        <div className="mt-8 flex gap-2 border-b border-sage/30">
          {speciesTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveSpecies(tab.key);
                setActiveCategory(null);
              }}
              className={`relative px-5 py-2.5 text-sm font-semibold transition-colors ${
                activeSpecies === tab.key
                  ? "text-sage-deep"
                  : "text-navy/50 hover:text-navy/70"
              }`}
            >
              {tab.label}
              {activeSpecies === tab.key && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-sage-deep" />
              )}
            </button>
          ))}
        </div>

        {/* Category filters */}
        {availableCategories.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === null
                  ? "bg-sage-deep text-cream"
                  : "bg-white text-navy/60 hover:bg-sage/20"
              }`}
            >
              All
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-sage-deep text-cream"
                    : "bg-white text-navy/60 hover:bg-sage/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {filteredProducts.map((product) => (
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
                <p className="mt-1 line-clamp-2 text-xs text-navy/50">
                  {product.description}
                </p>
                <p className="mt-2 text-sm font-bold text-sage-deep">
                  {formatPrice(product.price)}
                </p>
                <button
                  onClick={() => handleAdd(product)}
                  className={`mt-3 w-full rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                    addedId === product.id
                      ? "bg-sage-light text-cream"
                      : "bg-sage-deep text-cream hover:bg-sage-light"
                  }`}
                >
                  {addedId === product.id ? "Added!" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="text-4xl text-sage/40">
              <svg viewBox="0 0 48 48" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="24" r="20" />
                <path d="M16 24h16" />
              </svg>
            </div>
            <p className="mt-4 text-sm font-medium text-navy/50">
              No products in this category yet.
            </p>
            <p className="mt-1 text-xs text-navy/30">
              Check back soon — we're adding new stock regularly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
