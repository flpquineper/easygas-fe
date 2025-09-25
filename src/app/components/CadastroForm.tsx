'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import Link  from 'next/link';

export default function CadastroUserForm() {
  const { register } = useAuth();
  const router = useRouter(); 

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');
  const [complementAddress, setComplementAddress] = useState('');
  const [loading, setLoading] = useState(false); 

const handleCadastro = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !senha || !name || !phone || !address ) {
      toast.error('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    setLoading(true);
    try {
      const userData = {
        name,
        email,
        password: senha,
        phone,
        cpf,
        address,
        complementAddress,
      };

      await register(userData);

      toast.success('Cadastro realizado com sucesso. Bem-vindo(a)!');

      setTimeout(() => {
        router.push('/catalogo'); 
      }, 2000); 

    } catch {
      toast.error('Falha no cadastro. Verifique seus dados ou tente outro email.');
      setLoading(false);
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

            <button type="submit" disabled={loading} onClick={handleCadastro} className="w-full py-3 bg-blue-600 text-white rounded">
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>

            <Link href="/login/user" className="text-cyan-500 text-center text-base mt-4">
                <span className="text-black">Já tem uma conta? </span>
                <span className="text-cyan-500">Entrar</span>
            </Link>
        </main>
    </>
);
}
