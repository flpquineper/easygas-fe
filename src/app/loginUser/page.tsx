'use client';


import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';


export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Senha:", senha);

    if (email === "admin" && senha === "admin") {
      window.location.href = "/catalogo";
    } else {
      alert("Email ou senha incorretos. Tente novamente.");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 w-full max-w-xs">
        <h2 className="text-3xl font-semibold text-center">
          Faça seu login
        </h2>

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
          className="w-full py-3 bg-blue-600 text-white rounded text-center text-base"
        >
          Entrar
        </button>
      </main>
    </div>
  );
}
