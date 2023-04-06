import { api } from "@/services/api";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
type User = {
  email: string;
  name: string;
  phone: string;
};
type AuthContextType = {
  isAuthenticated: boolean;
  signin: (data: SigninData) => Promise<void>;
  user: User | null;
};

export type SigninData = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "maha-token": token } = parseCookies();
    if (token) {
      // pegar as informações do usuário
      // setUser(novas informações)
    }
  }, []);

  async function signin({ email, password }: SigninData) {
    const response = await api.post("/signin", { email, password });
    const { token } = response.data.token;
    // receber o user tbm
    setCookie(undefined, "maha-token", token, {
      maxAge: 60 * 60 * 1, //1 hour
    });

    setUser(response.data.user);

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signin, user }}>
      {children}
    </AuthContext.Provider>
  );
};
