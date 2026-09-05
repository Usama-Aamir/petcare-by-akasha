"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  status: string;
  total: number;
  created_at: string;
};

type OrderItem = {
  id: string;
  product_id: string | null;
  quantity: number;
  price: number;
  product: { name: string } | null;
};

const ORDER_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const loadItems = async (orderId: string) => {
    setLoadingItems(true);
    const { data } = await supabase
      .from("order_items")
      .select("id, product_id, quantity, price, product:products(name)")
      .eq("order_id", orderId);
    setItems((data as unknown as OrderItem[]) || []);
    setLoadingItems(false);
  };

  const handleSelect = (order: Order) => {
    setSelectedOrder(order);
    loadItems(order.id);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedOrder) return;
    setUpdating(true);
    await supabase.from("orders").update({ status: newStatus }).eq("id", selectedOrder.id);
    const updated = { ...selectedOrder, status: newStatus };
    setSelectedOrder(updated);
    setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
    setUpdating(false);
  };

  if (loading) {
    return <p className="py-8 text-center text-navy/40">Loading orders...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-sage-deep">Orders</h1>
      <p className="mt-1 text-sm text-navy/60">{orders.length} total orders</p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Order list */}
        <div className="rounded-2xl bg-white shadow-sm">
          {orders.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-navy/40">No orders yet</p>
          ) : (
            <div className="divide-y divide-sage-deep/5">
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => handleSelect(order)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-sage-deep/5 ${
                    selectedOrder?.id === order.id ? "bg-sage-deep/5" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-navy">{order.customer_name}</p>
                    <p className="text-xs text-navy/50">{new Date(order.created_at).toLocaleDateString()} · Rs. {order.total}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColors[order.status] || "bg-gray-100"}`}>
                    {order.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Order detail */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          {!selectedOrder ? (
            <p className="py-8 text-center text-sm text-navy/40">Select an order to view details</p>
          ) : (
            <div>
              <h2 className="text-lg font-bold text-sage-deep">Order Details</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Customer</span>
                  <span className="font-semibold text-navy">{selectedOrder.customer_name}</span>
                </div>
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Phone</span>
                  <span className="font-semibold text-navy">{selectedOrder.customer_phone}</span>
                </div>
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Address</span>
                  <span className="font-semibold text-navy text-right max-w-[60%]">{selectedOrder.customer_address}</span>
                </div>
                <div className="flex justify-between border-b border-sage-deep/10 pb-2">
                  <span className="text-navy/60">Date</span>
                  <span className="font-semibold text-navy">{new Date(selectedOrder.created_at).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/60">Total</span>
                  <span className="font-bold text-sage-deep">Rs. {selectedOrder.total}</span>
                </div>
              </div>

              {/* Items */}
              <div className="mt-4">
                <h3 className="text-sm font-bold text-sage-deep">Items</h3>
                {loadingItems ? (
                  <p className="mt-2 text-xs text-navy/40">Loading items...</p>
                ) : items.length > 0 ? (
                  <div className="mt-2 space-y-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-navy">{item.product?.name || "Unknown product"} × {item.quantity}</span>
                        <span className="text-navy/70">Rs. {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-navy/40">No items found</p>
                )}
              </div>

              {/* Status changer */}
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-bold text-sage-deep">Change Status</label>
                <div className="flex flex-wrap gap-2">
                  {ORDER_STATUSES.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={updating || selectedOrder.status === status}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                        selectedOrder.status === status
                          ? `${statusColors[status]} ring-2 ring-offset-1`
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      } disabled:opacity-50`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
