import React, { useEffect, useState } from "react";
import { getSweets, createSweet, updateSweet, deleteSweet, restockSweet } from "../api/sweets";
import SweetCard from "../components/SweetCard";
import type { Sweet } from "../types";
import toast from "react-hot-toast";
import axios from "axios";
import useJwt from "../hooks/useJwt";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [editing, setEditing] = useState<Sweet | null>(null);
  const jwt = useJwt();

  const navigate=useNavigate()

  const user =useSelector((state:RootState)=>(state.user))

  const load = async () => {
    if (!jwt) return;
    try {
      const res = await getSweets(jwt);
      setSweets(res);
    } catch (err) {
      toast.error("Failed to load");
      console.log(err)
    }
  };

  useEffect(() => {
      if (!user || !jwt) {
        navigate("/login");
      }
  }, [user, jwt, navigate]);

  useEffect(() => {
    if(!jwt) return; 
    (async () => {
    await load();
  })();
  }, [jwt]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = { name: String(f.get("name")), category: String(f.get("category")), price: Number(f.get("price")), quantity: Number(f.get("quantity")) };
    try {
      const newS = await createSweet(body,jwt!);
      setSweets((p) => [newS, ...p]);
      toast.success("Created");
      e.currentTarget.reset();
    } catch (err) {
      const message =(axios.isAxiosError(err) && err.response?.data?.message) ||(err instanceof Error && err.message) ||"Something went wrong";

        toast.error(message);
    }
  };
  
  const handleUpdate = async (id: string, body: Partial<Sweet>) => {
    try {
      const updated = await updateSweet(id,jwt!, body);
      setSweets((p) => p.map((s) => (s._id === id ? updated : s)));
      setEditing(null);
      toast.success("Updated");
    } catch (err) {
      const message =(axios.isAxiosError(err) && err.response?.data?.message) ||(err instanceof Error && err.message) ||"Something went wrong";

        toast.error(message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSweet(id,jwt!);
      setSweets((p) => p.filter((s) => s._id !== id));
      toast.success("Deleted");
    } catch (err) {
      const message =(axios.isAxiosError(err) && err.response?.data?.message) ||(err instanceof Error && err.message) ||"Something went wrong";

        toast.error(message);
    }
  };

  const handleRestock = async (id: string, amount: number) => {
    try {
      const updated = await restockSweet(id,jwt!, amount);
      setSweets((p) => p.map((s) => (s._id === id ? updated : s)));
      toast.success("Restocked");
    } catch (err) {
      const message =(axios.isAxiosError(err) && err.response?.data?.message) ||(err instanceof Error && err.message) ||"Something went wrong";

        toast.error(message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="bg-slate-100 rounded-md p-4 shadow-sm mb-4 ">
        <h3 className="font-bold text-xl mb-6">Create Sweet</h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 w-11/12 mx-auto  md:grid-cols-4 gap-2">
          <input name="name" placeholder="Name" className="p-2 border rounded-md shadow" />
          <input name="category" placeholder="Category" className="p-2 border rounded-md shadow" />
          <input name="price" type="number" placeholder="Price" className="p-2 border rounded-md shadow" />
          <input name="quantity" type="number" placeholder="Quantity" className="p-2 border rounded-md shadow" />
          <div className="col-span-1 w-full flex justify-end md:col-span-5">
            <button className=" w-3/12 mt-3 min-w-48  bg-indigo-600 text-white p-2 rounded-md">Create</button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sweets.map((s) => (
          <SweetCard key={s._id} sweet={s} isAdmin={true} onEdit={() => setEditing(s)} onDelete={handleDelete} onPurchase={() => {}} />
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded w-full max-w-lg">
            <h3 className="font-bold mb-2">Edit {editing.name}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                handleUpdate(editing._id, { name: String(f.get("name")), 
                  category: String(f.get("category")), 
                  price: Number(f.get("price")), 
                  quantity: Number(f.get("quantity")) 
                });
                setEditing(null)
                  
                }
            }
              className="space-y-2"
            >
              <input name="name" defaultValue={editing.name} className="w-full p-2 border rounded-md shadow" />
              <input name="category" defaultValue={editing.category} className="w-full p-2 border rounded-md shadow" />
              <input name="price" defaultValue={editing.price} type="number" className="w-full p-2 border rounded-md shadow" />
              <input name="quantity" defaultValue={editing.quantity} type="number" className="w-full p-2 border rounded-md shadow" />
              <div className="flex gap-2">
                <button className="bg-indigo-600 text-white p-2 rounded">Save</button>
                <button type="button" className="bg-gray-300 p-2 rounded" onClick={() => setEditing(null)}>
                  Cancel
                </button>
                <button type="button" className="bg-green-500 text-white p-2 rounded" onClick={() => { const a = Number(prompt("Amount to add") || "0"); if (a>0) handleRestock(editing._id, a); setEditing(null) }}>
                  Restock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
