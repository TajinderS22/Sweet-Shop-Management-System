import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = z.object({
  name: z.string().min(2),
  email: z.string(),
  password: z.string().min(6),
});
type FormData = {
    name: string,
  email: string,
  password: string,
};

export default function Register() {
  const { register, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });
    // const { register, handleSubmit } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log(data)
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axios.post("http://localhost:3000"+"/api/auth/register",data);
      toast.success("Registered");
      navigate("/login");
    } catch (err) {
      const message =(axios.isAxiosError(err) && err.response?.data?.message) ||(err instanceof Error && err.message) ||"Something went wrong";

        toast.error(message);
    }
  };

  return (
    <div className="h-[70svh] flex flex-col justify-center" >
        <div className="max-w-md mx-auto  bg-slate-200 p-6 rounded-md shadow">
          <h2 className="text-xl font-bold mb-4">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <input {...register("name")} placeholder="Name" className="w-full p-2 border" />
            <input {...register("email")} placeholder="Email" className="w-full p-2 border" />
            <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border" />
            <div className="w-full flex justify-end px-2 pt-2">
                <button className="w-3/12 flex justify-center bg-indigo-600 text-white p-2 rounded">Register</button>
            </div>
          </form>
        </div>
    </div>
  );
}
