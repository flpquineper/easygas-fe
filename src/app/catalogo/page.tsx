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

export default function Catalogo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 w-full max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h2 className="text-2xl font-semibold text-center">
          Produtos em Destaque
        </h2>

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
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full sm:w-[250px] md:w-[500px] lg:w-[700px] xl:w-[900px] 2xl:w-[1200px]"
          >
            {loading ? (
              <div className="p-8 text-center w-full">Carregando...</div>
            ) : products.length === 0 ? (
              <div className="p-8 text-center w-full">Nenhum produto encontrado.</div>
            ) : (
              products.map(product => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 flex flex-col items-center gap-2 min-w-[220px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px] 2xl:min-w-[450px] snap-center"
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
                  <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm mt-2">
                    Adicionar
                  </button>
                </div>
              ))
            )}
          </div>

          <button onClick={scrollRight} className="text-2xl p-2">&gt;</button>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg text-center w-full mt-8">
          <h3 className="text-lg font-semibold mb-2">
            Oferta Especial
          </h3>
          <p className="text-sm mb-4">
            Ganhe 10% OFF no seu primeiro pedido!
          </p>
          <button className="bg-white text-blue-700 font-semibold py-2 px-4 rounded">
            Aproveitar
          </button>
        </div>
      </main>
    </div>
  );
}
