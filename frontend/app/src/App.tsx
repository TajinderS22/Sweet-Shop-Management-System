import { Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel";
import RegisterAdmin from "./pages/RegisterAdmin";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { logout } from "./store/slices/UserSlice";
import type { User } from "./types";
import LandingPage from "./pages/LandingPage";

export default function App() {
  const user:User|null = useSelector((state: RootState) => state.user);

  // console.log('first',user)

  const dispatch = useDispatch();
    const location = useLocation();

    const hideNavbar = location.pathname === "/";


  return (
    <div className={`min-h-screen `}>
      {!hideNavbar && (
  <div className="border-b">
    <nav className="bg-white container mx-auto p-4 flex justify-between">
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
          <button
            className="text-sm px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  </div>
)}


      <main className="container w-11/12 mx-auto p-4">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute >
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
