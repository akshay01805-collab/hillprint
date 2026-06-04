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

    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow">
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

      {message && (
        <p className="text-green-600 font-semibold mt-4">
          {message}
        </p>
      )}
    </div>
  </section>
</main>

);
}