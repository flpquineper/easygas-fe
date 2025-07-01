'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth(); 
  
  const redirectTo = searchParams.get("redirectTo") || "/catalogo";

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault(); 
    
    setLoading(true);
    try {
      await login(email, senha); 

      router.replace(redirectTo);

    } catch (error: unknown) {
      let errorMessage = 'Email ou senha incorretos';
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast.error(errorMessage)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleLogin}
      className="flex flex-col items-center gap-8 w-full max-w-xs sm:max-w-sm md:max-w-md"
    >
      <h2 className="text-3xl font-semibold text-center">Faça seu login</h2>
      <div className="w-full flex flex-col gap-4">
        <label className="text-sm font-medium">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full p-3 border border-gray-300 rounded"
          placeholder="Digite seu email"
          required
        />
        <label className="text-sm font-medium">Senha</label>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          type="password"
          className="w-full p-3 border border-gray-300 rounded"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 bg-blue-600 text-white rounded text-center text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
      
      <Link 
        href={redirectTo.includes("/cadastro") ? "/cadastro/user" : `/cadastro/user?redirectTo=${redirectTo}`}
        className="text-cyan-500 text-center text-base mt-4"
      >
        <span className="text-black">Não possui uma conta ainda? </span>
        <span className="text-cyan-500">Cadastrar-se</span>
      </Link>
    </form>
  );
}