"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
  signOut: () => Promise<void>;
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
        console.error("Erro ao buscar perfil:", err);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/users/login", { email, password });
      const { user: userData } = response.data;

      setUser(userData);
      router.push("/catalogo");
    } catch (err) { 
      console.error(err);
      let message = "Falha no login. Verifique suas credenciais.";
      if (err instanceof AxiosError && err.response?.data?.erro) {
        message = err.response.data.erro;
      }
      toast.error(message);
    }
  }

  function updateUser(newUserData: User) {
    setUser(newUserData);
  }

  async function register(userData: RegisterData) {
    try {
      await api.post("/users/register", userData);
      await signIn({ email: userData.email, password: userData.password });
    } catch (err) { 
      console.error("Erro na função register do contexto:", err);
      let message = "Falha ao criar conta. Verifique os dados.";
      if (err instanceof AxiosError && err.response?.data?.erro) {
        message = err.response.data.erro;
      }
      toast.error(message);
      throw err;
    }
  }

  async function signOut() {
    try {
      await api.post('/users/logout');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
      router.push("/login/user");
    }
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