'use client';

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

type Product = {
  id: number;
  name: string | null;
  price: string; // Decimal geralmente vem como string do backend
  image: string | null;
};

type User = {
  id: number;
  name: string | null;
  phone: string | null;
  address: string | null;
  complementAddress: string | null;
};

export default function Catalogo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const showToast = localStorage.getItem("loginSuccess");
    if (showToast === "true") {
      toast.success("Login realizado com sucesso!");
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3305/products");
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        toast.error("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Buscando os dados do usuário no localStorage diretamente
  useEffect(() => {
    // Tenta buscar o objeto user, se não existir, busca os campos individuais
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        toast.error("Erro ao carregar dados do usuário");
      }
    } else {
      // Busca os campos individuais
      const phone = localStorage.getItem("userPhone");
      const address = localStorage.getItem("userAddress");
      const complementAddress = localStorage.getItem("userComplementAddress");
      if (phone && address) {
        setUser({
          id: 0,
          name: null,
          phone,
          address,
          complementAddress,
        });
      }
    }
  }, []);

  function scrollLeft() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  }

  function scrollRight() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  }

  // Construção da automação de pedidos via Whatsapp
  function handleBuy(product: Product) {
    if (!user || !user.phone || !user.address) {
      toast.error("Usuário ou endereço incompleto. Verifique suas informações.");
      return;
    }

    // Remove caracteres não numéricos do telefone e adiciona o código do país se necessário
    let phone = user.phone.replace(/\D/g, "");
    if (phone.length === 11 && !phone.startsWith("55")) {
      phone = "55" + phone;
    } else if (phone.length === 10 && !phone.startsWith("55")) {
      phone = "55" + phone;
    }

    const message =
      `Olá! Gostaria de comprar o produto *${product.name}* ` +
      `pelo valor de R$${Number(product.price).toFixed(2).replace('.', ',')}.\n`

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10">
      <main className="flex flex-col items-center gap-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-center">Produtos em Destaque</h2>

        <div className="w-full">
          <input
            type="text"
            placeholder="Buscar Produtos..."
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button className="py-2 px-4 bg-blue-600 text-white rounded-full text-sm">Todos</button>
            <button className="py-2 px-4 border border-gray-300 rounded-full text-sm">Gás de Cozinha</button>
            <button className="py-2 px-4 border border-gray-300 rounded-full text-sm">Galão de Água</button>
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <button onClick={scrollLeft} className="text-2xl p-2">&lt;</button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory w-full"
          >
            {loading ? (
              <div className="p-8 text-center w-full">Carregando...</div>
            ) : products.length === 0 ? (
              <div className="p-8 text-center w-full">Nenhum produto encontrado.</div>
            ) : (
              products.map(product => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 flex flex-col items-center gap-2 min-w-[250px] snap-center"
                >
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name || "Produto"}
                    width={80}
                    height={80}
                  />
                  <h3 className="font-semibold text-base text-center">{product.name}</h3>
                  <p className="text-xs text-gray-500 text-center">Entrega em até 40min</p>
                  <p className="font-semibold text-blue-600 mt-1 text-center">
                    R${Number(product.price).toFixed(2).replace('.', ',')}
                  </p>
                  <button 
                    onClick={() => handleBuy(product)} 
                    className="bg-blue-600 text-white px-3 py-2 rounded text-sm mt-2"
                  >
                    Comprar
                  </button>
                </div>
              ))
            )}
          </div>

          <button onClick={scrollRight} className="text-2xl p-2">&gt;</button>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg text-center w-full mt-8">
          <h3 className="text-lg font-semibold mb-2">Oferta Especial</h3>
          <p className="text-sm mb-4">Ganhe 10% OFF no seu primeiro pedido!</p>
          <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded">
            Aproveitar
          </button>
        </div>
      </main>
    </div>
  );
}
