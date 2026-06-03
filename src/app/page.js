export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow">
        <h1 className="text-2xl font-bold">HillPrint</h1>

        <div className="space-x-4">
          <button className="px-4 py-2 border rounded-lg">
            Shop Login
          </button>

          <button className="px-4 py-2 bg-black text-white rounded-lg">
            Customer Login
          </button>
        </div>
      </nav>

      <section className="text-center py-24 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Print Documents Online
        </h2>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Upload PDFs, Select A Nearby Print Shop, And Collect Your
          Documents Ready To Go.
        </p>

        <button className="bg-black text-white px-8 py-4 rounded-xl text-lg">
          Upload PDF
        </button>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="font-bold mb-2">1. Upload PDF</h4>
            <p>Select Your Document Online.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="font-bold mb-2">2. Choose Shop</h4>
            <p>Select A Nearby Printing Partner.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="font-bold mb-2">3. Collect Prints</h4>
            <p>Pick Up Your Documents When Ready.</p>
          </div>
        </div>
      </section>
    </main>
  );
}