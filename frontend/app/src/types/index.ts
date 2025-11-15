
export interface User {
  id: string;
  role: "user" | "admin";
}

export interface DecodedToken {
  id: string;
  role: "user" | "admin";
  exp?: number;
  iat?: number;
}
