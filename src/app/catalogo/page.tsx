"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import type { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { CartButton } from "../components/CartButton";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api"

const FILTERS = [
  { label: "Todos", value: "all" },
  { label: "Gás de Cozinha", value: "gas" },
  { label: "Galão de Água", value: "water" },
];

export default function Catalogo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { addToCart } = useCart();
  const { user } = useAuth();

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
      const response = await api.get('/products');
      setProducts(response.data);
    } catch {
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }
  fetchProducts();
}, [])


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

  async function handleAddToCart(product: Product) {
     await addToCart(product, 1);
  }

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) =>
          filter === "gas"
            ? p.name?.toLowerCase().includes("gás")
            : p.name?.toLowerCase().includes("água")
        );

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10">
      <CartButton/>
      <main className="flex flex-col items-center gap-8 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-center">
          Produtos em Destaque
        </h2>
        
         {user && (
          <div className="w-full text-right -mb-6">
            <p className="text-sm text-gray-600">Olá, <span className="font-semibold">{user.name}</span>!</p>
          </div>
        )}

        <div className="w-full">
          <input
            type="text"
            placeholder="Buscar Produtos..."
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`py-2 px-4 rounded-full text-sm ${
                  filter === f.value
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <button onClick={scrollLeft} className="text-2xl p-2">
            &lt;
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory w-full"
          >
            {loading ? (
              <div className="p-8 text-center w-full">Carregando...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-8 text-center w-full">
                Nenhum produto encontrado.
              </div>
            ) : (
              filteredProducts.map((product) => (
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
                  <h3 className="font-semibold text-base text-center">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 text-center">
                    Entrega em até 40min
                  </p>
                  <p className="font-semibold text-blue-600 mt-1 text-center">
                    R${Number(product.price).toFixed(2).replace(".", ",")}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 text-white px-3 py-2 rounded text-sm mt-2"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))
            )}
          </div>

          <button onClick={scrollRight} className="text-2xl p-2">
            &gt;
          </button>
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
