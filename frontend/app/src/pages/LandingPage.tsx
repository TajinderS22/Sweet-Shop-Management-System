import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-white to-yellow-100">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4">
        <h1 className="text-3xl font-bold text-pink-600">SweetShop</h1>

        <div className="space-x-6 text-lg">
          <Link to="/login" className="hover:text-pink-600 transition">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-pink-600 text-white px-4 py-2 rounded shadow hover:bg-pink-500 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 mt-10 md:mt-20">
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Discover Sweet Happiness 🍬  
          </h2>
          <p className="text-lg text-gray-600">
            Manage sweets, track inventory, handle purchases — all in one beautiful dashboard.
            Whether you're an admin or a customer, SweetShop makes everything easier.
          </p>

          <div className="space-x-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-pink-600 text-white rounded-md shadow hover:bg-pink-500 transition"
            >
              Get Started
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 border border-pink-600 text-pink-600 rounded-md hover:bg-pink-50 transition"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          
        </div>
      </div>

      {/* FEATURES */}
      <section className="mt-20 px-10 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
          Why Choose SweetShop?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <div className="p-6 bg-white shadow rounded-lg">
            <h4 className="text-xl font-semibold mb-2">🍩 Easy Inventory</h4>
            <p className="text-gray-600">Track sweet stock, restock efficiently, and avoid shortages.</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h4 className="text-xl font-semibold mb-2">🍬 Quick Purchase</h4>
            <p className="text-gray-600">Buy sweets in one click with real-time quantity updates.</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h4 className="text-xl font-semibold mb-2">🛠 Admin Control</h4>
            <p className="text-gray-600">Admins can add, edit and delete sweets effortlessly.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 py-6 text-center text-gray-500">
        © {new Date().getFullYear()} SweetShop · All rights reserved.
      </footer>
    </div>
  );
}
