export default function Home() {
return ( <main className="min-h-screen bg-slate-50 text-black"> <nav className="bg-white shadow"> <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center sm:flex-row sm:justify-between gap-4"> <h1 className="text-3xl font-extrabold">
HillPrint </h1>

```
      <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-3">
        <button className="w-full sm:w-auto px-5 py-2 border-2 border-black rounded-lg hover:bg-gray-100 transition">
          Shop Login
        </button>

        <button className="w-full sm:w-auto px-5 py-2 bg-black text-white rounded-lg hover:opacity-90 transition">
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

    <button className="bg-black text-white px-8 py-4 rounded-xl text-lg hover:opacity-90 transition">
      Upload PDF
    </button>
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