"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "@/contexts/CartContext";
import type { CartItem } from "@/types/cartItem";
import type { User } from "@/types/user"; // IMPORTA O TIPO USER

type PaymentMethod = {
  id: number;
  methodName: string;
};

export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useCart() as {
    cart: CartItem[];
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
  };

  const total = cart.reduce(
    (sum: number, item: CartItem) =>
      sum + Number(item.product.price) * Number(item.quantity),
    0
  );

  const [user, setUser] = useState<User | null>(null);

  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState<number | null>(null);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setAddress(parsedUser.address ?? "");
        setComplement(parsedUser.complementAddress ?? "");
      } catch {
        toast.error("Erro ao carregar usuário!");
      }
    }
  }, []);

  useEffect(() => {
    async function fetchMethods() {
      try {
        const res = await fetch("http://localhost:3305/payment-methods");
        const data = await res.json();
        setPaymentMethods(data);
      } catch {
        toast.error("Erro ao buscar métodos de pagamento");
      } finally {
        setLoadingPayments(false);
      }
    }
    fetchMethods();
  }, []);

  async function handleFinishOrder() {
    if (!address || !paymentMethodId) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    try {
      const orderBody = {
        address,
        complement,
        scheduledAt,
        paymentMethodId,
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        userId: user?.id,
      };

      const res = await fetch("http://localhost:3305/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderBody),
      });

      if (!res.ok) throw new Error("Erro ao criar pedido");
      alert("Pedido realizado com sucesso!");
      clearCart();
    } catch {
      toast.error("Falha ao finalizar pedido!");
    }
  }

  return (
    <main className="max-w-lg mx-auto py-8 px-4">
      <h2 className="text-xl font-bold mb-4">Finalizar Pedido</h2>

      {/* Itens do Carrinho */}
      <div className="bg-white rounded shadow p-4 mb-4">
        <h3 className="font-semibold mb-2">Itens do Carrinho</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li
                key={item.product.id}
                className="flex items-center justify-between mb-2"
              >
                <div>
                  <span className="font-semibold">{item.product.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    x{item.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500"
                  >
                    Remover
                  </button>
                  <span className="ml-2">
                    R${(Number(item.product.price) * Number(item.quantity)).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <button onClick={clearCart} className="mt-2 text-blue-500 underline">
            Limpar Carrinho
          </button>
        )}
      </div>

      <div className="bg-white rounded shadow p-4 mb-4">
        <h3 className="font-semibold mb-2">Endereço de Entrega</h3>
        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Endereço completo*"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Complemento (opcional)"
          value={complement}
          onChange={(e) => setComplement(e.target.value)}
        />
        <label className="block mb-2">
          Agendar entrega:
          <input
            type="datetime-local"
            className="ml-2 border rounded p-1"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </label>
      </div>

      <div className="bg-white rounded shadow p-4 mb-4">
        <h3 className="font-semibold mb-2">Forma de Pagamento*</h3>
        {loadingPayments ? (
          <p>Carregando métodos de pagamento...</p>
        ) : (
          <select
            className="w-full border p-2 rounded"
            value={paymentMethodId ?? ""}
            onChange={(e) => setPaymentMethodId(Number(e.target.value))}
            required
          >
            <option value="">Selecione...</option>
            {paymentMethods.map((m) => (
              <option key={m.id} value={m.id}>
                {m.methodName}
              </option>
            ))}
          </select>
        )}
        <span className="text-sm text-gray-500">Pagamento na entrega.</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-lg">Total:</span>
        <span className="font-bold text-lg text-blue-600">
          R${total.toFixed(2)}
        </span>
      </div>

      <button
        onClick={handleFinishOrder}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded font-bold"
        disabled={cart.length === 0}
      >
        Finalizar Pedido
      </button>
    </main>
  );
}
