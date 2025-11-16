import axios from "axios";
import type { Sweet } from "../types";

export const getSweets = async(  jwt:string, ) => {
    console.log(jwt)
    const res= await axios.get("http://localhost:3000"+'/api/sweets',{
      headers:{
        authorization:`Bearer ${jwt}` 
      }
    })
    return res.data
}
export const searchSweets = async (
  q: {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  },
  jwt: string
) => {
  const res = await axios.get("http://localhost:3000/api/sweets/search", {
    params: q,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return res.data;
};



export const createSweet = async (data: {
  name: string;
  category: string;
  price: number;
  quantity: number;  
  
},jwt:string) => {
  const res = await axios.post(
    "http://localhost:3000"+"/api/sweets",
    data,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return res.data;
};


export const updateSweet = async (id: string,  jwt:string,  data: Partial<Sweet>) =>{
  const res=await axios.put("http://localhost:3000"+`/api/sweets/${id}`, 
    data,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
    return res.data
}
export const deleteSweet = async (id: string  ,jwt:string, ) =>{
  const res=await axios.delete("http://localhost:3000"+`/api/sweets/${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
    return res.data
}
export const purchaseSweet = async (id: string,jwt:string  ) =>{
  const res=await axios.post("http://localhost:3000"+`/api/sweets/${id}/purchase`,{
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    return res.data
}
export const restockSweet  = async (id: string,  jwt:string,  amount: number) =>{
  const res=await axios.post("http://localhost:3000"+`/api/sweets/${id}/restock`, { amount },{
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    return res.data
}