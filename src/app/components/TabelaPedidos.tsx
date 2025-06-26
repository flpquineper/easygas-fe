import { Order } from '@/types';

interface TabelaPedidosProps {
  pedidos: Order[];
  onExpand: (pedido: Order) => void;
}

export default function TabelaPedidos({ pedidos, onExpand }: TabelaPedidosProps) {
  return (
    <div className="overflow-x-auto rounded-xl shadow mt-4">
      <table className="min-w-full bg-white text-black rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id} className="border-t hover:bg-gray-100">
              <td className="px-4 py-2">{pedido.id}</td>
              <td className="px-4 py-2">{pedido.user?.name || '---'}</td>
              <td className="px-4 py-2">{pedido.status?.statusName}</td>
              <td className="px-4 py-2">{new Date(pedido.orderDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-[#007E76] hover:bg-[#54D2B1] text-white px-3 py-1 rounded transition"
                  onClick={() => onExpand(pedido)}
                >
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}