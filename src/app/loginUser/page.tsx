'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3305/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password: senha })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login bem-sucedido:", data);
        localStorage.setItem("token", data.token);
        window.location.href = "/catalogo";
      } else {
        alert(data.erro || "Email ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 w-full max-w-xs">
        <h2 className="text-3xl font-semibold text-center">Faça seu login</h2>

        <div className="w-full flex flex-col gap-4">
          <label className="text-sm font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Digite seu email"
          />

          <label className="text-sm font-medium">Senha</label>
          <input
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Digite sua senha"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 bg-blue-600 text-white rounded text-center text-base ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <Link
          href="/cadastroUser"
          className="text-cyan-500 rounded text-center text-base mt-4"
        >
          <span className="text-black">Não possui uma conta ainda? </span>
          <span className="text-cyan-500">Cadastrar-se</span>
        </Link>
      </main>
    </div>
  );
}
