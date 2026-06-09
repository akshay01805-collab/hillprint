"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
const [pdfFile, setPdfFile] = useState(null);
const [fileName, setFileName] = useState("");
const [name, setName] = useState("");
const [mobile, setMobile] = useState("");
const [copies, setCopies] = useState(1);
const [printType, setPrintType] = useState("bw");
const [shop, setShop] = useState("ABS Financial Advisory");
const [message, setMessage] = useState("");

const pricePerCopy = printType === "bw" ? 6.5 : 15;
const totalPrice = Number(copies) * pricePerCopy;

const handleFileChange = (e) => {
const file = e.target.files[0];

if (file) {
  setPdfFile(file);
  setFileName(file.name);
}

};

const handleOrder = async () => {
if (!pdfFile) {
setMessage("Please Upload A PDF");
return;
}

const filePath = `${Date.now()}_${pdfFile.name}`;

const { error: uploadError } = await supabase.storage
  .from("PDFs")
  .upload(filePath, pdfFile);

if (uploadError) {
  console.log("UPLOAD ERROR:", uploadError);
  alert(JSON.stringify(uploadError));
  setMessage("PDF Upload Failed");
  return;
}

const { data } = supabase.storage
  .from("PDFs")
  .getPublicUrl(filePath);

const pdfUrl = data.publicUrl;

const { error } = await supabase
  .from("orders")
  .insert([
    {
      customer_name: name,
      mobile: mobile,
      file_name: fileName,
      pdf_url: pdfUrl,
      copies: Number(copies),
      print_type: printType,
      shop: shop,
      total_price: totalPrice,
      status: "Pending",
    },
  ]);

if (error) {
  console.log(error);
  setMessage("Error Saving Order");
} else {
  setMessage("Order Submitted Successfully!");

  setName("");
  setMobile("");
  setCopies(1);
  setPrintType("bw");
  setFileName("");
  setPdfFile(null);
}


};

return ( <main className="min-h-screen bg-slate-50 text-black"> <section className="text-center py-10 px-4"> <h1 className="text-4xl font-bold mb-6">
HillPrint </h1>

    <label className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer inline-block">
      Upload PDF
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>

    {fileName && (
      <div className="mt-4">
        <p>Selected File:</p>
        <p className="text-blue-600">
          {fileName}
        </p>
      </div>
    )}

    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-2xl shadow-x1">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="tel"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) =>
          setMobile(e.target.value)
        }
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="number"
        min="1"
        value={copies}
        onChange={(e) =>
          setCopies(e.target.value)
        }
        className="w-full border p-3 rounded mb-4"
      />

      <select
        value={printType}
        onChange={(e) =>
          setPrintType(e.target.value)
        }
        className="w-full border p-3 rounded mb-4"
      >
        <option value="bw">
          Black & White (₹6.5)
        </option>
        <option value="color">
          Color (₹15)
        </option>
      </select>

      <select
        value={shop}
        onChange={(e) =>
          setShop(e.target.value)
        }
        className="w-full border p-3 rounded mb-4"
      >
        <option>
          ABS Financial Advisory
        </option>
        <option>
          Theog Print House
        </option>
        <option>
          Cyber Point Theog
        </option>
      </select>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p>
          <strong>Shop:</strong> {shop}
        </p>
        <p>
          <strong>Estimated Cost:</strong> ₹
          {totalPrice}
        </p>
      </div>

      <button
        onClick={handleOrder}
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        Place Order
      </button>
      <a
  href="/track"
  className="block mt-4 text-center bg-white border border-black text-black px-6 py-3 rounded-xl font-semibold"
>
  Track My Order
</a>

      {message && (
        <p className="text-green-600 font-semibold mt-4">
          {message}
        </p>
      )}
    </div>
  </section>
  {/* HOW IT WORKS */}

<section
  style={{
    maxWidth: "1000px",
    margin: "60px auto",
    padding: "20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "32px",
      marginBottom: "30px",
    }}
  >
    How HillPrint Works
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
    }}
  >
    <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
      <h3>1. Upload PDF</h3>
      <p>Select The Document You Want To Print.</p>
    </div>


<div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
  <h3>2. Choose Printing Options</h3>
  <p>Select Copies, Print Type And Pickup Shop.</p>
</div>

<div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
  <h3>3. Collect Your Prints</h3>
  <p>Visit The Selected Shop And Collect Your Documents.</p>
</div>

  </div>
</section>

{/* WHY CHOOSE US */}

<section
  style={{
    background: "#ffffff",
    padding: "50px 20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "32px",
      marginBottom: "30px",
    }}
  >
    Why Choose HillPrint
  </h2>

  <ul
    style={{
      maxWidth: "700px",
      margin: "0 auto",
      lineHeight: "2",
      fontSize: "18px",
    }}
  >
    <li>Fast And Reliable Printing Service</li>
    <li>Multiple Pickup Locations</li>
    <li>Affordable Pricing</li>
    <li>Secure PDF Handling</li>
    <li>Easy Online Ordering</li>
  </ul>
</section>

{/* PICKUP LOCATIONS */}

<section
  style={{
    padding: "50px 20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "32px",
      marginBottom: "30px",
    }}
  >
    Pickup Locations
  </h2>

  <div
    style={{
      textAlign: "center",
      lineHeight: "2",
      fontSize: "18px",
    }}
  >
    <p>ABS Financial Advisory - Court Road Theog</p>
    <p>Theog Print House</p>
    <p>Cyber Point Theog</p>
  </div>
</section>

{/* PRIVACY POLICY */}

<section
  style={{
    background: "#ffffff",
    padding: "50px 20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "20px",
    }}
  >
    Privacy Policy
  </h2>

  <p
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      textAlign: "center",
      lineHeight: "1.8",
    }}
  >
    Uploaded Files Are Used Only For Printing Purposes.
    HillPrint Does Not Share Customer Files With Third Parties.
  </p>
</section>

{/* DISCLAIMER */}

<section
  style={{
    padding: "50px 20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "20px",
    }}
  >
    Disclaimer
  </h2>

  <p
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      textAlign: "center",
      lineHeight: "1.8",
    }}
  >
    Customers Are Responsible For The Content They Upload.
    Illegal, Copyright Violating Or Restricted Material Is Not Allowed.
  </p>
</section>

{/* CONTACT */}

<section
  style={{
    background: "#111827",
    color: "white",
    padding: "50px 20px",
    textAlign: "center",
  }}
>
  <h2>Contact Us</h2>

  <p>ABS Financial Advisory</p>
  <p>Court Road Theog</p>
  <p>WhatsApp: 8988477786</p>

  <p style={{ marginTop: "20px", opacity: "0.8" }}>
    © 2026 HillPrint. All Rights Reserved.
  </p>
</section>
<a
  href="https://wa.me/918988477786"
  target="_blank"
  rel="noreferrer"
  className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-full shadow-xl font-semibold"
>
  WhatsApp
</a>
</main>

);
}