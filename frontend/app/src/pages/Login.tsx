import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/UserSlice";
import { ServerAddress } from "../utils/constants";

type FormData = {
    name: string,
  email: string,
  password: string,
};
export default function Login() {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const dispatch=useDispatch()

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post(ServerAddress+"/api/auth/login",data);
        
      if(res.status==200){
        toast.success("Logged in");
        localStorage.setItem('jwt',res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        dispatch(setUser(res.data.user))

        if(res.data.user.role=='admin'){
          navigate("/admin");
        }else{
          navigate("/dashboard");
        }
      }else{
        toast.error("login failed")
      }
    } catch (err) {
        const message =(axios.isAxiosError(err) && err.response?.data?.message) ||(err instanceof Error && err.message) ||"Something went wrong";

        toast.error(message);
    }
  };

  return (
    <div className=" h-[70svh] flex flex-col justify-center ">
        <div className="max-w-md mx-auto bg-slate-200 p-6 rounded-md shadow">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <input {...register("email")} placeholder="Email" className="w-full p-2 border" />
            <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border" />
            <div className="w-full flex justify-end px-2 pt-2">
                <button className="w-3/12 flex justify-center bg-indigo-600 text-white p-2 rounded">Login</button>
            </div>
           </form>
        </div>
    </div>
  );
}
