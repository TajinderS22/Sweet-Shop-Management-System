import { useState } from "react";
import type { SweetSearchQuery } from "../types";

export default function SearchBar({ onSearch }: { onSearch: (q: SweetSearchQuery) => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  return (
    <div className="flex not-lg:flex-col gap-2 contain-sm bg-slate-100 p-4 w-full rounded-md mb-4 justify-between ">
      <div className="flex not-lg:flex-col  gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="p-2 not-lg:w-11/12 mx-auto border rounded" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="p-2  not-lg:w-11/12 mx-auto border rounded" />
        <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="min" className="p-2  not-lg:w-11/12 mx-auto border rounded w-20" />
        <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="max" className="p-2  not-lg:w-11/12 mx-auto border rounded w-20" />
      </div>
      <div className=" flex gap-2 not-lg:flex-col not-lgw-10/12 not-lg:items-end mr-8 ">
        
        <button
          className="bg-gray-300 h-full border  not-lg:min-w-48 px-3 rounded"
          onClick={() => {
            setName("");
            setCategory("");
            setMinPrice("");
            setMaxPrice("");
            onSearch({});
          }}
        >
          Clear
        </button>
        <button
          className="bg-indigo-600 h-full not-lg:min-w-48  text-white px-3 rounded"
          onClick={() =>
            onSearch({
              name: name || undefined,
              category: category || undefined,
              minPrice: minPrice ? Number(minPrice) : undefined,
              maxPrice: maxPrice ? Number(maxPrice) : undefined,
            })
          }
        >
          Search
        </button>
      </div>
    </div>
  );
}
