"use client";

import { useEffect, useState } from "react";
import type { OrderSummary } from "@/types/order";
import { useAuth } from "@/contexts/AuthContext";
import { OrderCard } from "@/app/components/OrderCard";
import { api } from '@/services/api'
import Link from "next/link";

export default function PedidosPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();


  useEffect(() => {
    if (!isAuthenticated) {
        setIsLoading(false);
        return;
    };

    async function fetchOrders() {
      setIsLoading(true);
      try {
        const response = await api.get('/orders'); 
        setOrders(response.data);
      } catch (error) {
        console.error("Falha ao buscar os pedidos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [isAuthenticated]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">Meus Pedidos</h1>

      {isLoading ? (
        <p>Carregando seus pedidos...</p>
      ) : orders.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Nenhum pedido encontrado</h2>
          <p className="text-gray-600 mt-2">Você ainda não fez nenhum pedido. Que tal começar agora?</p>
           <Link href="/catalogo" className="text-cyan-500 text-center text-base mt-4">
                <span className="text-black">Ainda não tem nenhum pedido? </span>
                <span className="text-cyan-500">catálogo</span>
            </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}