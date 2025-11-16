import React, { useState } from "react";
import type { SweetSearchQuery } from "../types";

export default function SearchBar({ onSearch }: { onSearch: (q: SweetSearchQuery) => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="p-2 border rounded" />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="p-2 border rounded" />
      <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="min" className="p-2 border rounded w-20" />
      <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="max" className="p-2 border rounded w-20" />
      <button
        className="bg-indigo-600 text-white px-3 rounded"
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
      <button
        className="bg-gray-200 px-3 rounded"
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
    </div>
  );
}
