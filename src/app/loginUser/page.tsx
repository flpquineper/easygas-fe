'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';

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
      <LoginForm />
    </div>
  );
}
