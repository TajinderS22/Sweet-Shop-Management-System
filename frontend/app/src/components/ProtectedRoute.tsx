import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";
import type { User } from "../types";

const ProtectedRoute: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  const user : User|null = useSelector((state:RootState)=>(state.user));
  console.log(user)
  if (!user) return <Navigate to="/login" replace />;
  if ((user as User).role !== "admin") return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
