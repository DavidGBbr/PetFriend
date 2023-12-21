"use client";
import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<boolean>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  email?: string;
  password?: string;
}

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
  console.log("Error logout");
  try {
    destroyCookie(null, "@pet.token", { path: "/" });
    Router.push("/login");
  } catch (error) {
    console.log("Error ao sair");
  }
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const response = await api.post("/login", {
          email,
          password,
        });

        const { id, name, token } = response.data;

        setCookie(undefined, "@pet.token", token, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });

        setUser({
          id,
          name,
          email,
        });

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success("Logado com sucesso!");
        window.location.href = "/";
      } catch (error) {
        toast.error("Erro ao fazer login!");
        console.log("Erro ao fazer login: ", error);
      }
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </AuthContext.Provider>
  );
}
