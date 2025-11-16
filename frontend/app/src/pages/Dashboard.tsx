import React, { useEffect, useState } from "react";
import { getSweets, searchSweets } from "../api/sweets";
import SweetCard from "../components/SweetCard";
import SearchBar from "../components/SearchBar";
import type { Sweet, SweetSearchQuery, User } from "../types";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import useJwt from "../hooks/useJwt";

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user); 
  const jwt = useJwt(); 

  const navigate = useNavigate();

  // Redirect if back to The Login page not logged in
  useEffect(() => {
    if (!user || !jwt) {
      navigate("/login");
    }
  }, [user, jwt, navigate]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getSweets(jwt!);
      setSweets(res);
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        (err instanceof Error && err.message) ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jwt) load();
  }, [jwt]);

  

  const handleSearch = async (q: SweetSearchQuery) => {
    try {
      const res = await searchSweets({ ...q, jwt: jwt! });
      setSweets(res);
    } catch {
      toast.error("Search failed");
    }
  };

  // const handleDelete = async (id: string) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/api/sweets/${id}`, {
  //       headers: { Authorization: `Bearer ${jwt}` },
  //     });
  //     toast.success("Deleted");
  //     setSweets((prev) => prev.filter((s) => s._id !== id));
  //   } catch (err) {
  //     const message =
  //       (axios.isAxiosError(err) && err.response?.data?.message) ||
  //       (err instanceof Error && err.message) ||
  //       "Something went wrong";
  //     toast.error(message);
  //   }
  // };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sweets</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sweets.map((s) => (
          <SweetCard
            key={s._id}
            sweet={s}
            isAdmin={(user as unknown as User)?.role === "admin"}
            onEdit={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
