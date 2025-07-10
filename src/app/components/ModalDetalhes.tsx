import { Order } from '@/types/order';

interface ModalDetalhesProps {
  pedido: Order | null;
  onClose: () => void;
}

export default function ModalDetalhes({ pedido, onClose }: ModalDetalhesProps) {
  if (!pedido) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-xl min-w-[320px] max-w-[90vw] relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-2xl font-bold text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Detalhes do Pedido</h2>
        <div className="mb-2">
          <b>ID:</b> {pedido.id}
        </div>
        <div className="mb-2">
          <b>Cliente:</b> {pedido.user?.name} ({pedido.user?.email})
        </div>
        <div className="mb-2">
          <b>Status:</b> {pedido.status?.statusName}
        </div>
        <div className="mb-2">
          <b>Data:</b> {new Date(pedido.orderDate).toLocaleString()}
        </div>
        <div className="mb-2">
          <b>Itens:</b>
          <ul className="list-disc ml-6">
            {pedido.items.map(item => (
              <li key={item.id}>
                {item.product?.name} — {item.quantity}x R$ {item.price}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <b>Entregador:</b> {pedido.deliveryMan?.name || 'Não alocado'}
        </div>
      </div>
    </div>
  );
}