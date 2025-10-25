// src/contexts/AuthContext.tsx
"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";
import { toast } from "react-toastify";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  address: string;
  complementAddress?: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  register: (data: RegisterData) => Promise<void>;
  loading: boolean;
  updateUser: (newUserData: User) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isAuthenticated = !!user;

useEffect(() => {
    console.log("AuthContext useEffect iniciado.");
    setLoading(true);

    console.log("Tentando buscar /users/profile...");
    api
      .get("/users/profile")
      .then((response) => {
        console.log("Sucesso ao buscar perfil:", response.data);
        setUser(response.data);
      })
      .catch((err) => {
        console.error(">>> ERRO ao buscar perfil no AuthContext:", err.message);
        if (err.response) {
          console.error("Status:", err.response.status);
          console.error("Data:", err.response.data);
        }
        setUser(null); 
      })
      .finally(() => {
        console.log("AuthContext useEffect finalizado.");
        setLoading(false);
      });

  }, []); 

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/users/login", { email, password });
      const { user: userData } = response.data;

      setUser(userData);
      router.push("/catalogo");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.erro || "Falha no login. Verifique suas credenciais.");
    }
  }

  function updateUser(newUserData: User) {
    setUser(newUserData);
  }

  async function register(userData: RegisterData) {
    try {
      await api.post("/users/register", userData);
      await signIn({ email: userData.email, password: userData.password });
    } catch (err: any) {
      console.error("Erro na função register do contexto:", err);
      toast.error(
        err.response?.data?.erro || "Falha ao criar conta. Verifique os dados."
      );
      throw err;
    }
  }

  function signOut() {
    // destroyCookie(null, "easygas.token"); // Remova ou deixe comentado
    setUser(null);
    router.push("/login/user");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signOut,
        loading,
        register,
        updateUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};