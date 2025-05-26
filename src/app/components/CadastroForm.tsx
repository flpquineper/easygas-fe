'use client';

import { useState } from "react";
import Link from "next/link";

export default function CadastroForm() {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, password: senha, phone, cpf, address, complementAddress,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setIsModalOpen(true);
      } else {
        alert(data.error || "Erro ao realizar o cadastro.");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor. Tente novamente.");
    }
  };

return (
    <>
        <main className="flex flex-col items-center gap-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h2 className="text-3xl font-semibold text-center">Faça seu cadastro</h2>

            <div className="w-full flex flex-col gap-4">
                <label className="text-sm font-medium">Nome completo</label>
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Nome completo" className="w-full p-3 border rounded" />

                <label className="text-sm font-medium">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full p-3 border rounded" />

                <label className="text-sm font-medium">Telefone (WhatsApp)</label>
                <input onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Telefone (WhatsApp)" className="w-full p-3 border rounded" />

                <label className="text-sm font-medium">CPF</label>
                <input onChange={(e) => setCpf(e.target.value)} type="text" placeholder="CPF" className="w-full p-3 border rounded" />

                <label className="text-sm font-medium">Endereço</label>
                <input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Endereço" className="w-full p-3 border rounded" />

                <label className="text-sm font-medium">Complemento</label>
                <input onChange={(e) => setComplementAddress(e.target.value)} type="text" placeholder="Complemento" className="w-full p-3 border rounded" />

                <label className="text-sm font-medium">Senha</label>
                <input onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Senha" className="w-full p-3 border rounded" />
            </div>

            <button onClick={handleCadastro} className="w-full py-3 bg-blue-600 text-white rounded">
                Criar Conta
            </button>

            <Link href="/login/user" className="text-cyan-500 text-center text-base mt-4">
                <span className="text-black">Já tem uma conta? </span>
                <span className="text-cyan-500">Entrar</span>
            </Link>
        </main>

        {isModalOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg w-80 text-center">
                    <h2 className="text-2xl font-semibold mb-6">Você está cadastrado!</h2>
                    <p className="text-sm text-gray-600 mb-6">Acesse a pagina de login e entre com sua conta:</p>
                    <Link href="/login/user" className="px-6 py-3 bg-blue-600 text-white rounded mb-6">Ir para Login</Link>
                    <button onClick={() => setIsModalOpen(false)} className="mt-4 w-full py-2 bg-gray-300 text-gray-800 rounded">
                        Fechar
                    </button>
                </div>
            </div>
        )}
    </>
);
}
