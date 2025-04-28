'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CadastroUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCadastro = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 w-full max-w-xs">
        <h2 className="text-3xl font-semibold text-center">Faça seu cadastro</h2>

        <div className="w-full flex flex-col gap-4">
          <label className="text-sm font-medium">Nome Completo</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Digite seu nome completo"
          />

          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Digite seu email"
          />

          <label className="text-sm font-medium">Telefone (WhatsApp)</label>
          <input
            type="tel"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Digite seu telefone (WhatsApp)"
          />

          <label className="text-sm font-medium">Senha</label>
          <input
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
              Obrigado, seu login foi realizado. Acesse o catálogo abaixo:
            </p>
            <Link
              href="/catalogo"
              className="px-6 py-3 bg-blue-600 text-white rounded mb-6"
            >
              Ver Catálogo
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
