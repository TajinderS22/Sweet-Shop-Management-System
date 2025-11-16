import type { Sweet } from "../types";

export default function SweetCard({
  sweet,
  onPurchase,
  onEdit,
  onDelete,
  isAdmin,
}: {
  sweet: Sweet;
  onPurchase?: (id: string) => void;
  onEdit?: (s: Sweet) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}) {
  return (
    <div className="bg-orange-100 border border-orange-800 p-4 rounded-md shadow flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{sweet.name}</h3>
        <span className="text-sm text-gray-500">{sweet.category}</span>
      </div>
      <p className="mt-2">Price: ₹{sweet.price}</p>
      <p className={`mt-1 ${sweet.quantity === 0 ? "text-red-500" : "text-green-600"}`}>Stock: {sweet.quantity}</p>

      <div className="mt-4 flex gap-2">
        <button
          disabled={sweet.quantity === 0}
          className={`px-3 py-1 rounded ${sweet.quantity === 0 ? "bg-gray-300" : "bg-green-500 text-white"}`}
          onClick={() => onPurchase?.(sweet._id)}
        >
          Purchase
        </button>

        {isAdmin && (
          <>
            <button className="px-3 py-1 rounded bg-yellow-400" onClick={() => onEdit?.(sweet)}>
              Edit
            </button>
            <button className="px-3 py-1 rounded bg-red-500 text-white" onClick={() => onDelete?.(sweet._id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
