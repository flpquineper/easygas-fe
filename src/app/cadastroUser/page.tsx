'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CadastroForm from "../components/CadastroForm";

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
    <CadastroForm />
    </div>
  );
}
