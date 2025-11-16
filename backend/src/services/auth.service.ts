
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import User from "../models/Users.js";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface RegisterAdminData {
  name: string;
  email: string;
  password: string;
  secret:string;
}

export interface LoginData {
  email: string;
  password: string;
}


export const registerAdmin = async ({
  name,
  email,
  password,
  secret
}: RegisterAdminData) => {
  const exists = await User.findOne({ email });
  if(secret!==process.env.ADMIN_LOGIN_SECRET) return {
    message:"you are nor authorised to signup"
  }
  if (exists) throw new Error("Email already registered");

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: "admin",
  });
  if(!user){
    return {
        message:'User registration failed '
    }
  }

  // console.log(user)

  return {
    message: "Registration successful",
  };
};



export const register = async ({
  name,
  email,
  password,
}: RegisterData) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("Email already registered");

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: "user",
  });
  if(!user){
    return {
        message:'User registration failed '
    }
  }

  // console.log(user)

  return {
    message: "Registration successful",
    
  };
};

export const login = async ({ email, password }: LoginData) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid email or password");

  return {
    message: "Login successful",
    token: generateToken((user._id as string).toString(), user.role),
    user:user
  };
};
