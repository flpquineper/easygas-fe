import type { OrderSummary } from "@/types/order";

const statusColors: { [key: string]: string } = {
  'Recebido': 'bg-blue-100 text-blue-800',
  'Em Rota de Entrega': 'bg-yellow-100 text-yellow-800',
  'Entregue': 'bg-green-100 text-green-800',
  'Cancelado': 'bg-red-100 text-red-800',
};

type OrderCardProps = {
  order: OrderSummary;
};

export function OrderCard({ order }: OrderCardProps) {
  const total = order.items.reduce((sum, item) => {
    return sum + (Number(item.product.price) * item.quantity);
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 w-full">
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <div>
          <h3 className="font-bold text-lg">Pedido #{order.id}</h3>
          <p className="text-xs text-gray-500">
            Realizado em: {new Date(order.orderDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[order.status.statusName] || 'bg-gray-100 text-gray-800'}`}>
          {order.status.statusName}
        </span>
      </div>

      <div className="text-sm">
        <h4 className="font-semibold mb-1">Itens:</h4>
        <ul className="list-disc list-inside pl-2 text-gray-700 mb-3">
          {order.items.map((item, index) => (
            <li key={index}>
              {item.quantity}x {item.product.name}
            </li>
          ))}
        </ul>
        <p><span className="font-semibold">Endereço de Entrega:</span> {order.orderNote}</p>
        <p><span className="font-semibold">Forma de Pagamento:</span> {order.paymentMethod.methodName}</p>
        {order.deliveryTime && (
           <p className="font-semibold text-blue-600">Agendado para: {new Date(order.deliveryTime).toLocaleString('pt-BR')}</p>
        )}
      </div>

      <div className="text-right font-bold text-lg mt-3 pt-3 border-t">
        Total: R$ {total.toFixed(2)}
      </div>
    </div>
  );
}