'use client';
import { useOrders } from '../../hooks/useOrders';
import CardResumo from '../../components/CardResumo';
import TabelaPedidos from '../../components/TabelaPedidos';
import ModalDetalhes from '../../components/ModalDetalhes';
import { useState } from 'react';
import { Order } from '@/types';

export default function AdminDashboard() {
  const { orders, loading, error } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (loading) return <div>Carregando pedidos...</div>;
  if (error) return <div>{error}</div>;

  // Exemplo: filtrar por status
  const pendingOrders = orders.filter(order => order.status.statusName === "Pendente");
  const deliveredOrders = orders.filter(order => order.status.statusName === "Entregue");

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Principal</h1>
      <div className="flex gap-4 mb-6">
        <CardResumo label="Pedidos Pendentes" valor={pendingOrders.length} cor="bg-red-200" />
        <CardResumo label="Pedidos Entregues" valor={deliveredOrders.length} cor="bg-blue-200" />
      </div>
      <TabelaPedidos pedidos={orders} onExpand={(order) => setSelectedOrder(order)} />
      <ModalDetalhes pedido={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </main>
  );
}