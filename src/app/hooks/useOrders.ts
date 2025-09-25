import { SetStateAction, useEffect, useState } from 'react';
import { api } from '../services/api'; // ajuste o caminho conforme seu projeto
import { Order } from '@/types'; // agora usando o tipo certo!

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/orders')
      .then((response: { data: SetStateAction<Order[]>; }) => {
        setOrders(response.data); // ajuste para response.data.data se a sua API retorna aninhado
        setError(null);
      })
      .catch(() => {
        setError('Erro ao buscar pedidos');
      })
      .finally(() => setLoading(false));
  }, []);

  return { orders, loading, error };
}