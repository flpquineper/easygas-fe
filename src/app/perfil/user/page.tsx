'use client';

import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  cpf: string | null;
  address: string | null;
  complementAddress: string | null;
};

export default function Perfil() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function fetchUserData() {
      try {
        const res = await fetch('http://localhost:3305/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Erro ao carregar perfil');
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUserData();
  }, []);

  if (!user) {
    return <div className="text-center py-10">Carregando perfil...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Perfil do Usuário</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-600 font-medium">Nome</label>
            <p className="text-lg text-gray-900">{user.name}</p>
          </div>

          <div>
            <label className="text-gray-600 font-medium">Email</label>
            <p className="text-lg text-gray-900">{user.email}</p>
          </div>

          <div>
            <label className="text-gray-600 font-medium">CPF</label>
            <p className="text-lg text-gray-900">{user.cpf}</p>
          </div>

          <div>
            <label className="text-gray-600 font-medium">Telefone</label>
            <p className="text-lg text-gray-900">{user.phone}</p>
          </div>

          <div className="md:col-span-2">
            <label className="text-gray-600 font-medium">Endereço</label>
            <p className="text-lg text-gray-900">
              {user.address} {user.complementAddress && ` - ${user.complementAddress}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
