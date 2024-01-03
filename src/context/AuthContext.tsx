"use client";
import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

interface AuthContextData {
  user: UserProps;
  signIn: (credentials: SignInProps) => Promise<boolean>;
  signUp: (credentials: SignUpProps) => Promise<boolean>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  pets?: [];
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  email?: string;
  password?: string;
}

interface SignUpProps {
  name?: string;
  email?: string;
  password?: string;
}

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
  try {
    destroyCookie(null, "@pet.token", { path: "/" });
    window.location.href = "/login";
  } catch (error) {
    console.log("Error ao sair: ");
  }
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();

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

        setUser({ id, name, email });

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        toast.success("Usuário logado!");
        window.location.href = "/dashboard";
      } catch (error) {
        toast.error("Erro ao fazer login!");
      }
    });
  }

  async function signUp({ name, email, password }: SignUpProps) {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const response = await api.post("/register", {
          name,
          email,
          password,
        });

        toast.success("Usuário cadastrado!");
        await signIn({ email, password });
        window.location.href = "/";
        resolve(true);
      } catch (error) {
        toast.error("Erro ao cadastrar");
        console.error(error);
        reject(false);
      }
    });
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp }}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </AuthContext.Provider>
  );
}
