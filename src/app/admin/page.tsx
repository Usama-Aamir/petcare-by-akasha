import { createClient } from "@/lib/supabase";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: productCount }, { count: orderCount }, { count: bookingCount }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("bookings").select("*", { count: "exact", head: true }),
  ]);

  const [{ data: recentOrders }, { data: recentBookings }] = await Promise.all([
    supabase.from("orders").select("id, customer_name, status, total, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("bookings").select("id, customer_name, pet_species, preferred_date, preferred_time, status").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Products", value: productCount ?? 0, href: "/admin/products", color: "bg-sage-deep" },
    { label: "Orders", value: orderCount ?? 0, href: "/admin/orders", color: "bg-sage-light" },
    { label: "Bookings", value: bookingCount ?? 0, href: "/admin/bookings", color: "bg-navy" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-sage-deep">Dashboard</h1>
      <p className="mt-1 text-sm text-navy/60">Overview of your store and bookings</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
              <span className="text-lg font-bold text-cream">{stat.value}</span>
            </div>
            <p className="text-sm font-semibold text-sage-deep">{stat.label}</p>
          </a>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-sage-deep">Recent Orders</h2>
        {recentOrders && recentOrders.length > 0 ? (
          <div className="mt-4 space-y-2">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b border-sage-deep/10 pb-2 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-navy">{order.customer_name}</p>
                  <p className="text-xs text-navy/50">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-sage-deep">Rs. {order.total}</span>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-navy/40">No orders yet</p>
        )}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-sage-deep">Recent Bookings</h2>
        {recentBookings && recentBookings.length > 0 ? (
          <div className="mt-4 space-y-2">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between border-b border-sage-deep/10 pb-2 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-navy">{booking.customer_name}</p>
                  <p className="text-xs text-navy/50">
                    {booking.pet_species} · {booking.preferred_date} · {booking.preferred_time}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-navy/40">No bookings yet</p>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    requested: "bg-amber-100 text-amber-700",
    completed: "bg-green-100 text-green-700",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
