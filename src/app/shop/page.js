"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function ShopDashboard() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const totalOrders = orders.length;

const pendingOrders = orders.filter(
  (o) => o.status === "Pending"
).length;

const printingOrders = orders.filter(
  (o) => o.status === "Printing"
).length;

const readyOrders = orders.filter(
  (o) => o.status === "Ready"
).length;

const deliveredOrders = orders.filter(
  (o) => o.status === "Delivered"
).length;

const totalRevenue = orders.reduce(
  (sum, order) => sum + Number(order.total_price || 0),
  0
);

 useEffect(() => {
  checkUser();
}, []);

const checkUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    router.push("/login");
    return;
  }

  fetchOrders();
};

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setOrders(data || []);
    }
  };

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (!error) {
      fetchOrders();
    }
  };

  return (
    
    <main
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "#f8fafc",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Shop Dashboard
      </h1>
      <button
  onClick={async () => {
    await supabase.auth.signOut();
    router.push("/login");
  }}
  style={{
    background: "red",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    marginBottom: "20px",
    cursor: "pointer",
  }}
>
  Logout
</button>
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
    marginBottom: "25px",
  }}
>
  <div
    style={{
      background: "white",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <h3>Total Orders</h3>
    <h2>{totalOrders}</h2>
  </div>

  <div
    style={{
      background: "#f3f4f6",
      padding: "15px",
      borderRadius: "10px",
    }}
  >
    <h3>Pending</h3>
    <h2>{pendingOrders}</h2>
  </div>

  <div
    style={{
      background: "#fef3c7",
      padding: "15px",
      borderRadius: "10px",
    }}
  >
    <h3>Printing</h3>
    <h2>{printingOrders}</h2>
  </div>

  <div
    style={{
      background: "#dcfce7",
      padding: "15px",
      borderRadius: "10px",
    }}
  >
    <h3>Ready</h3>
    <h2>{readyOrders}</h2>
  </div>

  <div
    style={{
      background: "#dbeafe",
      padding: "15px",
      borderRadius: "10px",
    }}
  >
    <h3>Delivered</h3>
    <h2>{deliveredOrders}</h2>
  </div>

  <div
    style={{
      background: "#ede9fe",
      padding: "15px",
      borderRadius: "10px",
    }}
  >
    <h3>Total Revenue</h3>
    <h2>₹{totalRevenue}</h2>
  </div>
</div>
<input
  type="text"
  placeholder="Search By Name Or Mobile"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  }}
/>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            background: "white",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                ID
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Customer
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Mobile
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                File
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
  PDF
</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Price
              </th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {orders
  .filter(
    (order) =>
      order.customer_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order.mobile
        ?.toString()
        .includes(search)
  )
  .map((order) => (
              <tr key={order.id}>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {order.id}
                </td>

                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {order.customer_name}
                </td>

                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {order.mobile}
                </td>

                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {order.file_name}
                </td>
               <td style={{ padding: "12px", border: "1px solid #ddd" }}>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}
  >
    <a
      href={order.pdf_url}
      target="_blank"
      rel="noreferrer"
      style={{
        background: "green",
        color: "white",
        padding: "8px",
        borderRadius: "5px",
        textDecoration: "none",
        textAlign: "center",
      }}
    >
      View PDF
    </a>

    <a
      href={order.pdf_url}
      download
      style={{
        background: "#2563eb",
        color: "white",
        padding: "8px",
        borderRadius: "5px",
        textDecoration: "none",
        textAlign: "center",
      }}
    >
      Download PDF
    </a>
  </div>
</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  ₹{order.total_price}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      {order.status}
                    </div>

                    <button
                      onClick={() =>
                        updateStatus(order.id, "Printing")
                      }
                      style={{
                        background: "orange",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Printing
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(order.id, "Ready")
                      }
                      style={{
                        background: "green",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Ready
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(order.id, "Delivered")
                      }
                      style={{
                        background: "blue",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Delivered
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}