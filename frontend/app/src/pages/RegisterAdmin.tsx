import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  secret: z.string().min(1, "Secret is required"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axios.post(
        "http://localhost:3000/api/auth/register-admin",
        data
      );
      toast.success("Admin Registered Successfully");
      navigate("/login");
    } catch (err) {
      const message =
        (axios.isAxiosError(err) && err.response?.data?.message) ||
        (err instanceof Error && err.message) ||
        "Something went wrong";

      toast.error(message);
    }
  };

  return (
    <div className="h-[70svh] flex flex-col justify-center">
      <div className="w-md mx-auto bg-slate-200 p-6 rounded-md shadow">
        <h2 className="text-xl font-bold mb-4">Register Admin</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("secret")}
              type="text"
              placeholder="Secret Code"
              className="w-full p-2 border rounded"
            />
            {errors.secret && (
              <p className="text-red-500 text-sm">{errors.secret.message}</p>
            )}
          </div>

          <div className="w-full flex justify-end px-2 pt-2">
            <button
              type="submit"
              className="w-3/12 flex justify-center bg-indigo-600 text-white p-2 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
