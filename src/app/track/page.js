"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TrackOrder() {
  const [mobile, setMobile] = useState("");
  const [orders, setOrders] = useState([]);

  const searchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("mobile", mobile)
      .order("id", { ascending: false });

    if (!error) {
      setOrders(data || []);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-4">
          Track Your Order
        </h1>

        <p className="text-center text-slate-600 mb-8">
          Enter Your Mobile Number To Check Order Status
        </p>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="flex-1 border p-3 rounded-lg"
          />

          <button
            onClick={searchOrders}
            className="bg-indigo-600 text-white px-6 rounded-lg"
          >
            Search
          </button>
        </div>

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-xl shadow mb-4"
          >
            <h3 className="font-bold text-lg">
              Order #{order.id}
            </h3>

            <p>
              <strong>File:</strong> {order.file_name}
            </p>

            <p>
              <strong>Shop:</strong> {order.shop}
            </p>

            <p>
              <strong>Amount:</strong> ₹{order.total_price}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span className="font-bold text-indigo-600">
              <span
  className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
    order.status === "Pending"
      ? "bg-gray-500"
      : order.status === "Printing"
      ? "bg-yellow-500"
      : order.status === "Ready"
      ? "bg-green-600"
      : "bg-blue-600"
  }`}
>
  {order.status}
</span>
              </span>
            </p>
          </div>
        ))}

        {mobile && orders.length === 0 && (
          <p className="text-center text-red-500">
            No Orders Found
          </p>
        )}
      </div>
    </main>
  );
}