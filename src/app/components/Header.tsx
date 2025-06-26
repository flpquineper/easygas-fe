'use client';

import { useEffect, useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";

export function Header() {
  const [userName, setUserName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const token = localStorage.getItem("token");

    if (name && token) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userAddress");
    localStorage.removeItem("userComplementAddress");
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  return (
    <nav className="bg-[var(--header-background)] border-gray-200 relative z-50">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-3">
        <button
          onClick={() => {
            const name = localStorage.getItem("userName");
            if (name) {
              window.location.href = "/catalogo";
            } else {
              window.location.href = "/";
            }
          }}
          className="flex items-center space-x-3"
        >
          <span className="text-[var(--header-text)] text-2xl font-semibold whitespace-nowrap p-3 ml-4">
            Distribuidora de Gás
          </span>
        </button>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4 mr-8">
          {userName && (
            <>
              <span className="text-white font-medium text-base bg-black/30 px-4 py-2 rounded-full backdrop-blur-md">
                {userName}
              </span>
              <button
                onClick={handleLogout}
                className="text-white bg-gray-900 hover:bg-gray-500 transition-colors px-4 py-2 rounded-full font-semibold"
              >
                🔓 Sair
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden mr-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && userName && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center space-y-5 animate-fade-in">
            
            {/* Botão Fechar (canto superior) */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Fechar modal"
            >
              <X size={22} />
            </button>

            {/* Cabeçalho */}
            <h2 className="text-xl font-semibold text-gray-800">Conta do Usuário</h2>
            <p className="text-sm text-gray-500">Você está logado como:</p>

            {/* Nome do usuário */}
            <div className="flex items-center justify-center gap-2 text-gray-800 bg-gray-100 px-4 py-2 rounded-full">
              <User size={18} />
              <span className="font-medium text-base">{userName}</span>
            </div>

            {/* Botão de logout */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 transition-colors px-4 py-2 rounded-full font-semibold text-white w-full shadow"
            >
              <LogOut size={18} />
              Sair da conta
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}
