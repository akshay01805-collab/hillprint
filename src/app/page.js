"use client";

import { useState } from "react";
const [shop, setShop] = useState("ABS Financial Advisory");
const [message, setMessage] = useState("");
const pricePerCopy = printType === "bw" ? 6.5 : 15;
const totalPrice = copies * pricePerCopy;

export default function Home() {
const [fileName, setFileName] = useState("");
const [name, setName] = useState("");
const [mobile, setMobile] = useState("");
const [copies, setCopies] = useState(1);
const [printType, setPrintType] = useState("bw");

const handleFileChange = (e) => {
  const handleOrder = () => {
  setMessage("Order Submitted Successfully!");
};
const file = e.target.files[0];

if (file) {
  setFileName(file.name);
}

};

return ( <main className="min-h-screen bg-slate-50 text-black"> <nav className="bg-white shadow"> <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center sm:flex-row sm:justify-between gap-4"> <h1 className="text-3xl font-extrabold">
HillPrint </h1>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-3">
        <button className="w-full sm:w-auto px-5 py-2 border-2 border-black rounded-lg">
          Shop Login
        </button>

        <button className="w-full sm:w-auto px-5 py-2 bg-black text-white rounded-lg">
          Customer Login
        </button>
      </div>
    </div>
  </nav>

  <section className="text-center py-20 px-4">
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
      Print Documents Online
    </h2>

    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
      Upload PDFs, Select A Nearby Print Shop, And Collect Your
      Documents Ready To Go.
    </p>

    <label className="bg-black text-white px-8 py-4 rounded-xl text-lg cursor-pointer inline-block">
      Upload PDF
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>

    {fileName && (
      <div className="mt-6">
        <p className="font-semibold">
          Selected File:
        </p>
        <p className="text-blue-600">
          {fileName}
        </p>
      </div>
    )}

    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="tel"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="number"
        min="1"
        placeholder="Copies"
        value={copies}
        onChange={(e) => setCopies(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      <select
        value={printType}
        onChange={(e) => setPrintType(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      >
        <option value="bw">Black & White</option>
        <option value="color">Color</option>
      </select>
<select
  value={shop}
  onChange={(e) => setShop(e.target.value)}
  className="w-full border p-3 rounded mb-4"
>
  <option>ABS Financial Advisory</option>
  <option>Theog Print House</option>
  <option>Cyber Point Theog</option>
</select>

<div className="bg-gray-100 p-4 rounded mb-4">
  <p>
    <strong>Selected Shop:</strong> {shop}
  </p>

  <p>
    <strong>Estimated Cost:</strong> ₹{totalPrice}
  </p>
</div>
      <button
  onClick={handleOrder}
  className="w-full bg-black text-white py-3 rounded-lg"
>
  Place Order
</button>
<button
  onClick={handleOrder}
  className="w-full bg-black text-white py-3 rounded-lg"
>
  Place Order
</button>
    </div>
  </section>

  <section className="max-w-6xl mx-auto py-16 px-4">
    <h3 className="text-3xl font-bold text-center mb-10">
      How It Works
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h4 className="font-bold text-lg mb-2">
          1. Upload PDF
        </h4>
        <p className="text-gray-600">
          Select Your Document Online.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h4 className="font-bold text-lg mb-2">
          2. Choose Shop
        </h4>
        <p className="text-gray-600">
          Select A Nearby Printing Partner.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h4 className="font-bold text-lg mb-2">
          3. Collect Prints
        </h4>
        <p className="text-gray-600">
          Pick Up Your Documents When Ready.
        </p>
      </div>
    </div>
  </section>
</main>
);
}