'use client';

import { useEffect, useState } from "react";
import { Menu, X, LogOut, User, List } from "lucide-react";

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
    localStorage.clear(); // remove tudo, inclusive token
    window.location.href = "/";
  };

  return (
    <nav className="bg-[var(--header-background)] border-gray-200 relative z-50">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-3">
        <button
          onClick={() => {
            const name = localStorage.getItem("userName");
            window.location.href = name ? "/catalogo" : "/";
          }}
          className="flex items-center space-x-3"
        >
          <span className="text-[var(--header-text)] text-2xl font-semibold whitespace-nowrap p-3 ml-4">
            OlizGás
          </span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4 mr-8">
          {userName && (
            <>
            <div className="flex flex-row items-center gap-2">
              <span className="text-white font-semibold text-base bg-black/30 px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2">
                <User size={18} />
                {userName}
              </span>
            </div>
                <button
                onClick={() => setMenuOpen(true)} className="text-white"
                >
                <Menu size={28} />
                </button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden mr-4">
          <button onClick={() => setMenuOpen(true)} className="text-white">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Sidebar Mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background escuro */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="ml-auto bg-white w-64 h-full p-6 shadow-2xl z-50 animate-slide-in-right relative flex flex-col gap-6">
            {/* Fechar */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Fechar menu"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mt-6">Menu</h2>

            {/* Nome do usuário */}
            {userName && (
                <div className="flex items-center gap-2 text-white px-4 py-2 rounded-full bg-[var(--header-background)]">
                  <User size={18} />
                  <span className="font-semibold text-base">{userName}</span>
                </div>
            )}
            {/* Opções */}
            <button
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors hover:bg-gray-100 rounded px-2 py-1 cursor-pointer"
              onClick={() => (window.location.href = "/perfil/user")}
            >
              <User size={18} />
              Perfil
            </button>

            <button className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors">
              <List size={18} />
              Pedidos
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors mt-auto"
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
