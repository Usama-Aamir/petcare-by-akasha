import { createClient } from "@/lib/supabase";
import ShopClient, { type ShopProduct, type ShopCategory } from "@/components/shop-client";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select(
        "id, name, description, price, image_url, category:categories(species, category, subcategory)"
      )
      .eq("is_active", true)
      .order("created_at", { ascending: true }),
    supabase
      .from("categories")
      .select("species, category")
      .order("species", { ascending: true })
      .order("category", { ascending: true }),
  ]);

  const uniqueCategories: ShopCategory[] = [];
  const seen = new Set<string>();
  for (const c of categories ?? []) {
    const key = `${c.species}:${c.category}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueCategories.push(c);
    }
  }

  return (
    <ShopClient
      products={(products ?? []) as unknown as ShopProduct[]}
      categories={uniqueCategories}
    />
  );
}
