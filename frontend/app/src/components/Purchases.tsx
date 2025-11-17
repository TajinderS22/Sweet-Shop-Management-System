import axios from "axios"
import { useEffect, useState } from "react"
import { ServerAddress } from "../utils/constants"
import useJwt from "../hooks/useJwt"


export interface Sweet {
  _id: string;
  sweetName: string;
  category: string;
  price: number;
  quantityPurchased: number;
  createdAt?: string;
}





const Purchases = () => {


  function formatDateTime(isoString: string): string {
  const dateObj = new Date(isoString);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = months[dateObj.getUTCMonth()];
  const day = dateObj.getUTCDate();
  // const year = dateObj.getUTCFullYear();

  const hours = String(dateObj.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

  return `${month} ${day}  ${hours}:${minutes}:${seconds}`;
}





  const [purchases, setPurchases] = useState([])

  const jwt = useJwt()
    
  const getPurchaseHistory = async (token: string) => {
    const res = await axios.get(ServerAddress + "/api/purchases", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setPurchases(res.data)
  }

  useEffect(() => {
    if (!jwt) return
    const fetchData = async () => {
      try {
        await getPurchaseHistory(jwt)
      } catch (err) {
        // handle error if desired
        console.error("Failed to load purchases", err)
      }
    }
    fetchData()
  }, [jwt])

  return (
    <div>

      <div>
        <table className="bg-amber-100 shadow-md rounded-2xl w-full text-left  ">
          <thead className=" ">
            <tr>
              <th className=" border-  p-4">Name</th>
              <th className=" border-l  p-4">Quantity</th>
              <th className=" border-l  p-4">Price</th>
              <th className=" border-l  p-4">Time</th>
            </tr>
          </thead>
          <tbody className="">
            {purchases.map((p:Sweet, i) => (
              <tr className=" rounded-2xl p-12" key={i}>
                <td className="p-3   border-t rounde-2xl ">{p.sweetName?? "-"}</td>
                <td className="p-3  border-l border-t rounde-2xl ">{p.quantityPurchased ?? "-"}</td>
                <td className="p-3  border-l border-t rounde-2xl ">{p.price ?? "-"}</td>
                <td className="p-3  border-l border-t rounde-2xl ">{formatDateTime(p.createdAt!) ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        
    </div>
  )
}

export default Purchases