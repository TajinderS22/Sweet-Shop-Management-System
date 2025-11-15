import React, { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import type { User, DecodedToken } from "../types";
import { AuthContext } from "./Authcontext";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const getUserFromToken = (token: string | null): User | null => {
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (!decoded.id || !decoded.role) return null;

      return { id: decoded.id, role: decoded.role };
    } catch {
      return null;
    }
  };

  const user = useMemo(() => getUserFromToken(token), [token]);

  const login = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
