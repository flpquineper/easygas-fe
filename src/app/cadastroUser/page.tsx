'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CadastroUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [complementAddress, setComplementAddress] = useState("");

  const handleCadastro = async () => {
    if (!email || !senha || !name || !phone || !cpf || !address || !complementAddress) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3305/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password: senha,
          phone,
          cpf,
          address,
          complementAddress,
        }),
      });

      const data = await response.json();
      console.log("Resposta da API:", data);


      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setIsModalOpen(true);
      } else {
        alert(data.error || "Ocorreu um erro ao realizar o cadastro.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao conectar ao servidor. Tente novamente.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 mt-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 w-full max-w-xs">
        <h2 className="text-3xl font-semibold text-center">Faça seu cadastro</h2>

        <div className="w-full flex flex-col gap-4">
          <label className="text-sm font-medium">Nome Completo</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Digite seu nome completo"
          />

          <label className="text-sm font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Digite seu email"
          />

          <label className="text-sm font-medium">Telefone (WhatsApp)</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Digite seu telefone (WhatsApp)"
          />

          <label className="text-sm font-medium">CPF</label>
          <input
            onChange={(e) => setCpf(e.target.value)}
            type="text"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Digite seu CPF"
          />

          <label className="text-sm font-medium">Endereço</label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Digite seu endereço"
          />

          <label className="text-sm font-medium">Complemento</label>
          <input
            onChange={(e) => setComplementAddress(e.target.value)}
            type="text"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Complemento do endereço"
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
          onClick={handleCadastro}
          className="w-full py-3 bg-blue-600 text-white rounded text-center text-base"
        >
          Criar Conta
        </button>

        <Link
          href="/loginUser"
          className="text-cyan-500 rounded text-center text-base mt-4"
        >
          <span className="text-black">Já tem uma conta? </span>
          <span className="text-cyan-500">Entrar</span>
        </Link>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-80 text-center">
            <h2 className="text-2xl font-semibold mb-6">Você está cadastrado!</h2>
            <p className="text-sm text-gray-600 mb-6">
              Obrigado, sua conta foi criada com sucesso. Acesse o catálogo e faça seu pedido:
            </p>
            <Link
              href="/catalogo"
              className="px-6 py-3 bg-blue-600 text-white rounded mb-6"
            >
              Acessar Catálogo
            </Link>
            <button
              onClick={closeModal}
              className="mt-4 w-full py-2 bg-gray-300 text-gray-800 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
