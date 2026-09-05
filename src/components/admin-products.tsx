"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_qty: number;
  image_url: string | null;
  is_active: boolean;
  category_id: string | null;
};

type Category = {
  id: string;
  species: string;
  category: string;
  subcategory: string;
};

const emptyProduct: Partial<Product> = {
  name: "",
  description: "",
  price: 0,
  stock_qty: 0,
  image_url: "",
  is_active: true,
  category_id: null,
};

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("species, category, subcategory"),
    ]);
    setProducts(prods || []);
    setCategories(cats || []);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditing({ ...emptyProduct });
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!editing || !editing.name) return;
    setSaving(true);
    setError("");
    const payload = {
      name: editing.name,
      description: editing.description || null,
      price: Number(editing.price) || 0,
      stock_qty: Number(editing.stock_qty) || 0,
      image_url: editing.image_url || null,
      is_active: editing.is_active ?? true,
      category_id: editing.category_id || null,
    };
    let err;
    if (editing.id) {
      const { error } = await supabase.from("products").update(payload).eq("id", editing.id);
      err = error;
    } else {
      const { error } = await supabase.from("products").insert(payload);
      err = error;
    }
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    setShowForm(false);
    setEditing(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    loadData();
  };

  const catLabel = (catId: string | null) => {
    if (!catId) return "—";
    const cat = categories.find((c) => c.id === catId);
    return cat ? `${cat.species} · ${cat.category} · ${cat.subcategory}` : "—";
  };

  if (loading) {
    return <p className="py-8 text-center text-navy/40">Loading products...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sage-deep">Products</h1>
          <p className="mt-1 text-sm text-navy/60">{products.length} products in catalog</p>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-full bg-sage-deep px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-cream transition-colors hover:bg-sage-light"
        >
          + Add Product
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {/* Product table */}
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sage-deep/10 text-left text-xs uppercase text-navy/50">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Active</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-sage-deep/5 last:border-0">
                <td className="px-4 py-3 font-medium text-navy">{product.name}</td>
                <td className="px-4 py-3 text-sage-deep font-semibold">Rs. {product.price}</td>
                <td className="px-4 py-3 text-navy/70">{product.stock_qty}</td>
                <td className="px-4 py-3 text-navy/60 text-xs">{catLabel(product.category_id)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${product.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {product.is_active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="rounded-lg bg-sage-deep/10 px-3 py-1 text-xs font-semibold text-sage-deep transition-colors hover:bg-sage-deep/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="rounded-lg bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-navy/40">No products yet. Click &quot;Add Product&quot; to create one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal form */}
      {showForm && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setShowForm(false)}>
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-sage-deep">{editing.id ? "Edit Product" : "Add Product"}</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-sage-deep">Name</label>
                <input
                  type="text"
                  value={editing.name || ""}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-2.5 text-navy outline-none focus:border-sage-deep"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-sage-deep">Description</label>
                <textarea
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-2.5 text-navy outline-none focus:border-sage-deep"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-sage-deep">Price (Rs.)</label>
                  <input
                    type="number"
                    value={editing.price ?? 0}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-2.5 text-navy outline-none focus:border-sage-deep"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-sage-deep">Stock Qty</label>
                  <input
                    type="number"
                    value={editing.stock_qty ?? 0}
                    onChange={(e) => setEditing({ ...editing, stock_qty: Number(e.target.value) })}
                    className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-2.5 text-navy outline-none focus:border-sage-deep"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-sage-deep">Image URL</label>
                <input
                  type="text"
                  value={editing.image_url || ""}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-2.5 text-navy outline-none focus:border-sage-deep"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-sage-deep">Category</label>
                <select
                  value={editing.category_id || ""}
                  onChange={(e) => setEditing({ ...editing, category_id: e.target.value || null })}
                  className="w-full rounded-xl border border-sage-deep/20 bg-white px-4 py-2.5 text-navy outline-none focus:border-sage-deep"
                >
                  <option value="">— No category —</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.species} · {cat.category} · {cat.subcategory}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing.is_active ?? true}
                  onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                  className="h-4 w-4 rounded border-sage-deep/20"
                />
                <span className="text-sm font-semibold text-sage-deep">Active (visible in shop)</span>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-full border-2 border-sage-deep px-5 py-2 text-sm font-bold uppercase text-sage-deep transition-colors hover:bg-sage-deep hover:text-cream"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-full bg-sage-deep px-5 py-2 text-sm font-bold uppercase text-cream transition-colors hover:bg-sage-light disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
