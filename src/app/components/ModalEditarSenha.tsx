'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

interface PasswordData {
  currentPassword?: string;
  newPassword?: string;
}

interface ModalEditarSenhaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PasswordData) => Promise<void>; 
}

export const ModalEditarSenha = ({ isOpen, onClose, onSave }: ModalEditarSenhaProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("As novas senhas não coincidem.");
      return;
    }
    try {
      await onSave({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose(); 
    } catch (error: unknown) { 
      console.error("Falha ao salvar senha:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Alterar Senha</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" placeholder="Senha Atual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder="Nova Senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder="Confirmar Nova Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400">Cancelar</button>
            <button type="submit" className="py-2 px-4 rounded bg-emerald-600 text-white hover:bg-emerald-700">Salvar Nova Senha</button>
          </div>
        </form>
      </div>
    </div>
  );
};