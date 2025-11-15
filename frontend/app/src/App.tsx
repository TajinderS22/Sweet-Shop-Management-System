import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <nav className="bg-wh
      ite shadow p-4 flex justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-xl">
            SweetShop
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {user && (
            <>
              {user.role === "admin" && <Link to="/admin">Admin</Link>}
              <button className="text-sm px-3 py-1 bg-red-500 text-white rounded" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}
