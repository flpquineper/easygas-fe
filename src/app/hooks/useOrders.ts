import { SetStateAction, useEffect, useState } from 'react';
import { api } from '../services/api';
import { Order } from '@/types';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/orders')
      .then((response: { data: SetStateAction<Order[]>; }) => {
        setOrders(response.data); 
        setError(null);
      })
      .catch(() => {
        setError('Erro ao buscar pedidos');
      })
      .finally(() => setLoading(false));
  }, []);

  return { orders, loading, error };
}