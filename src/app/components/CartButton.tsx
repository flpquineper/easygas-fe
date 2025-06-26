"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export function CartButton() {
  const { cart } = useCart();
  const router = useRouter();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => router.push("/checkout")}
      className="fixed bottom-8 right-6 z-50 flex items-center bg-white hover:bg-white text-blue rounded-full shadow-lg px-5 py-3 transition-all"
      style={{ minWidth: 60, minHeight: 60 }}
    >
      <span className="relative">
        <ShoppingCart size={28} />
        {totalQuantity > 0 && (
          <span
            className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow"
            style={{ minWidth: 22, minHeight: 22, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          >
            {totalQuantity}
          </span>
        )}
      </span>
    </button>
  );
}