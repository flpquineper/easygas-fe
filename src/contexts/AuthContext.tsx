"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { api } from "../app/services/api";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import type { User } from "@/types/user";

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
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "easygas.token": token } = parseCookies();
    if (token) {
      api
        .get("/users/profile")
        .then((response) => {
          setUser(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/users/login", { email, password });
      const { token, user: userData } = response.data;

      setCookie(undefined, "easygas.token", token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setUser(userData);

      router.push("/catalogo");
    } catch (err) {
      console.error(err);
      alert("Falha no login. Verifique suas credenciais.");
    }
  }

  async function register(userData: RegisterData) {
    try {
      await api.post("/users/register", userData);
      await signIn({ email: userData.email, password: userData.password });
    } catch (err) {
      console.error("Erro na função register do contexto:", err);
      alert(
        "Falha ao criar conta. Verifique os dados ou tente um email diferente."
      );

      throw err;
    }
  }

  function signOut() {
    destroyCookie(undefined, "easygas.token");
    delete api.defaults.headers["Authorization"];
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
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
