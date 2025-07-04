'use client';

import { useState } from "react";
import {
  Menu,
  X,
  LogOut,
  User,
  Store,
  ClipboardList,
  UserCog, 
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-[var(--header-background)] border-gray-200 relative z-50">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-3">
        <button
          onClick={() => {
            window.location.href = isAuthenticated ? "/catalogo" : "/";
          }}
          className="flex items-center space-x-3"
        >
          <span className="text-[var(--header-text)] text-2xl font-semibold whitespace-nowrap p-3 ml-4">
            OlizGás
          </span>
        </button>

        <div className="hidden md:flex items-center gap-4 mr-8">
          {isAuthenticated ? (
            <>
              <div className="flex flex-row items-center gap-2">
                <span className="text-white font-semibold text-base bg-black/30 px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2">
                  <User size={18} />
                  {user?.name}
                </span>
              </div>
              <button onClick={() => setMenuOpen(true)} className="text-white">
                <Menu size={28} />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login/user"
                className="bg-white text-blue-700 px-4 py-2 rounded font-semibold hover:bg-gray-100"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro/user"
                className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden mr-4">
          <button onClick={() => setMenuOpen(true)} className="text-white">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="ml-auto bg-white w-64 h-full p-6 shadow-2xl z-50 animate-slide-in-right relative flex flex-col gap-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Fechar menu"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mt-6">Menu</h2>

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-white px-4 py-2 rounded-full bg-[var(--header-background)]">
                  <User size={18} />
                  <span className="font-semibold text-base">{user?.name}</span>
                </div>
                <button
                  className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors hover:bg-gray-100 rounded px-2 py-1 cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = "/perfil/user";
                  }}
                >
                  <UserCog size={18} />
                  Perfil
                </button>
                <button
                  className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = "/pedidos/user";
                  }}
                >
                  <ClipboardList size={18} />
                  Meus Pedidos
                </button>

                <button
                  className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors  hover:bg-gray-100 rounded px-2 py-1 cursor-pointer"
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = "/catalogo";
                  }}
                >
                  <Store size={18} />
                  Catálogo
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors mt-auto  hover:bg-gray-100 rounded px-2 py-1 cursor-pointer"
                >
                  <LogOut size={18} />
                  Sair da conta
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  href="/login/user"
                  className="bg-blue-600 text-white text-center py-2 rounded font-semibold hover:bg-blue-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro/user"
                  className="bg-gray-100 text-blue-700 text-center py-2 rounded font-semibold hover:bg-blue-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
