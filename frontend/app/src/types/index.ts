export interface SweetSearchQuery {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface User {
  id: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  token: string;
  message?: string;
}

export interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt?: string;
}


export interface DecodedToken {
  id: string;
  role: "user" | "admin";
  exp?: number;
  iat?: number;
}