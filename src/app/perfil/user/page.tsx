"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import { ModalEditarSenha } from "@/app/components/ModalEditarSenha";
import { AxiosError } from "axios";

// Interface para os dados da senha (para tipar o handleSavePassword)
interface PasswordData {
  currentPassword?: string;
  newPassword?: string;
}
interface ApiErrorData {
  erro: string;
}

export default function PerfilPage() {
  const { user, loading, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    address: "",
    complementAddress: "",
  });

  // Preenche o formulário quando o usuário do context carregar
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        cpf: user?.cpf || "",
        phone: user?.phone || "",
        address: user?.address || "",
        complementAddress: user?.complementAddress || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Salvar Edições do Perfil
  const handleSaveProfile = async () => {
    try {
      const response = await api.patch("/users/profile", formData);
      updateUser(response.data);
      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const apiError = error.response?.data as ApiErrorData;
        toast.error(apiError?.erro || "Erro ao atualizar perfil.");
      } else {
        toast.error("Erro ao atualizar perfil.");
      }
    }
  };

  // 3. Cancelar Edição
  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        cpf: user?.cpf || "",
        phone: user?.phone || "",
        address: user?.address || "",
        complementAddress: user?.complementAddress || "",
      });
    }
    setIsEditing(false);
  };

  const handleSavePassword = async (passwordData: PasswordData) => {
    try {
      await api.patch("/users/profile/password", passwordData);
      toast.success("Senha atualizada com sucesso!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const apiError = error.response?.data as ApiErrorData;
        toast.error(apiError?.erro || "Erro ao atualizar senha.");
      } else {
        toast.error("Erro ao atualizar senha.");
      }
      throw error;
    }
  };

  if (loading) {
    return <div>Carregando perfil...</div>;
  }

  if (!user) {
    return <div>Usuário não autenticado.</div>;
  }

  const fields = [
    { label: "Nome", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "CPF", name: "cpf", type: "text" },
    { label: "Telefone", name: "phone", type: "tel" },
    { label: "Endereço", name: "address", type: "text", span: "md:col-span-2" },
    {
      label: "Complemento",
      name: "complementAddress",
      type: "text",
      span: "md:col-span-2",
    },
  ];

  return (
    <>
      <ModalEditarSenha
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePassword}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Perfil do Usuário
            </h2>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="py-2 px-4 rounded bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Alterar Senha
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="py-2 px-4 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Editar Perfil
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="py-2 px-4 rounded bg-gray-300 hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Salvar Alterações
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.name} className={field.span || ""}>
                <label className="text-gray-600 font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData] || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full text-lg p-2 border rounded-md ${
                    !isEditing
                      ? "bg-gray-100 text-gray-900 border-gray-100"
                      : "bg-white text-gray-900 border-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
