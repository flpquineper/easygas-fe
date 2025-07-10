"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "@/contexts/CartContext";
import type { CartItem } from "@/types/cartItem";
import type { PaymentMethod } from "@/types/paymentMethod";
import { useAuth } from "@/contexts/AuthContext";
import type { CompletedOrder } from "@/types/order";

export default function Checkout() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const { user, token, loading: authLoading } = useAuth();

  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [showScheduler, setShowScheduler] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState<number | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [loadingPayments, setLoadingPayments] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      setAddress(user.address ?? "");
      setComplement(user.complementAddress ?? "");
    }
  }, [user]);

  useEffect(() => {
    async function fetchMethods() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment-methods`);
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
    if (!address) {
      toast.error("O endereço de entrega é obrigatório.");
      return;
    }
    if (!paymentMethodId) {
      toast.error("Por favor, selecione uma forma de pagamento.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        address,
        complementAddress: complement,
        scheduledAt: showScheduler && scheduledAt ? scheduledAt : null,
        paymentMethodId,
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      };

      const res = await fetch("http://localhost:3305/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.erro || "Falha ao criar o pedido.");
      }

      const newOrderData = await res.json();

      toast.success("Pedido realizado com sucesso!");
      clearCart();
      setShowModal(true);

      setCompletedOrder(newOrderData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function openWhatsapp() {
    if (!completedOrder) return;

    const phoneNumber = "5553991148588";
  
    let message = `Olá, OlizGás! Confirmação do pedido #${completedOrder.id}.\n\n`;
    message += `*Cliente:* ${completedOrder.user.name}\n`;
    message += `*Endereço de Entrega:* ${completedOrder.orderNote}\n`;
    message += `*Forma de Pagamento:* ${completedOrder.paymentMethod.methodName}\n\n`;
    message += "*Itens do Pedido:*\n";
    completedOrder.items.forEach((item) => {
      message += `- ${item.quantity}x ${item.product.name}\n`;
    });
    message += `\n*Total:* R$ ${Number(completedOrder.total).toFixed(2)}`;
    
    if (completedOrder.deliveryTime) {
      const deliveryDate = new Date(completedOrder.deliveryTime);
      const formattedDate = deliveryDate.toLocaleString('pt-BR', {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
      });
      message += `\n\n*ENTREGA AGENDADA PARA:* ${formattedDate}`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
}

  return (
    <>
      <main className="max-w-lg mx-auto py-8 px-4">
        <h2 className="text-xl font-bold mb-4">Finalizar Pedido</h2>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-semibold mb-2">Itens do Carrinho</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            <ul>
              {cart.map((item: CartItem) => (
                <li
                  key={item.product.id}
                  className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <span className="font-semibold">{item.product.name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      x{item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      R$
                      {(
                        Number(item.product.price) * Number(item.quantity)
                      ).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                      aria-label={`Remover ${item.product.name}`}
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Limpar Carrinho
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-semibold mb-2">Endereço de Entrega</h3>
          {user && (
            <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-700">
                Os campos abaixo vêm do seu cadastro, mas você pode editá-los
                para este pedido específico.
              </p>
            </div>
          )}
          <input
            className="w-full border p-2 mb-2 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Endereço completo*"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="street-address"
            required
          />
          <input
            className="w-full border p-2 mb-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Complemento (opcional)"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            autoComplete="address-line2"
          />

          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input
              type="checkbox"
              checked={showScheduler}
              onChange={(e) => setShowScheduler(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Agendar entrega para outra data/horário
          </label>

          {showScheduler && (
            <div className="mt-3 animate-in fade-in duration-300">
              <label className="block text-xs text-gray-600">
                Selecione a data e hora:
              </label>
              <input
                type="datetime-local"
                className="mt-1 w-full border rounded p-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h3 className="font-semibold mb-2">Forma de Pagamento*</h3>
          {loadingPayments ? (
            <p>Carregando...</p>
          ) : (
            <select
              className="w-full border p-2 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={paymentMethodId ?? ""}
              onChange={(e) => setPaymentMethodId(Number(e.target.value))}
              required
            >
              <option value="" disabled>
                Selecione...
              </option>
              {paymentMethods.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.methodName}
                </option>
              ))}
            </select>
          )}
          <p className="text-xs text-gray-500 mt-2">
            O pagamento é realizado no momento da entrega.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total do Pedido:</span>
            <span className="font-bold text-lg text-blue-600">
              R${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={handleFinishOrder}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cart.length === 0 || isSubmitting || authLoading}
        >
          {isSubmitting ? "Finalizando..." : "Finalizar Pedido"}
        </button>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center max-w-sm w-full mx-4 animate-in fade-in-90 zoom-in-95">
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              Pedido Realizado!
            </h2>
            <p className="mb-6 text-gray-700">
              Seu pedido foi enviado com sucesso. Para confirmar e acompanhar a
              entrega, fale conosco no WhatsApp.
            </p>
            <button
              onClick={openWhatsapp}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg w-full text-lg shadow-md transition-transform transform hover:scale-105"
            >
              Acompanhar no WhatsApp
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm text-gray-500 hover:text-gray-800"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
