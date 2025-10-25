"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import type { CartItem } from "@/types/cartItem";
import type { Product } from "@/types/product";
import { useAuth } from "./AuthContext";
import { api } from "@/services/api";
import { toast } from "react-toastify";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
  totalPrice: number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function getLocalCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const localData = localStorage.getItem("guest_cart");
  try {
    return localData ? JSON.parse(localData) : [];
  } catch {
    return [];
  }
}

function saveLocalCart(cart: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("guest_cart", JSON.stringify(cart));
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchUserCart = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {

      const response = await api.get("/api/carts");

      setCart(response.data.items || []);
    } catch (error) {
      console.error("Falha ao buscar carrinho da API:", error);
      setCart([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]); 

  useEffect(() => {
    if (user) {
      fetchUserCart();
    } else {
      setCart(getLocalCart());
      setIsLoading(false);
    }
  }, [user, fetchUserCart]);

  useEffect(() => {
    if (!user) {
      saveLocalCart(cart);
    }
  }, [cart, user]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!user) {
      setIsLoading(true);
      const existingItem = cart.find((item) => item.product.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newCartItem: CartItem = {
          id: Date.now(),
          product,
          quantity,
          productId: product.id,
          cartId: 0,
        };
        newCart = [...cart, newCartItem];
      }
      setCart(newCart);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Usando api.post, que já tem a URL base e o token
      await api.post("/api/carts/item", {
        productId: product.id,
        quantity,
      });

      // Esta linha só será executada em caso de SUCESSO
      toast.success("Produto adicionado ao carrinho!");
      await fetchUserCart(); // Atualiza o carrinho após o sucesso
    } catch (error) {
      // Se a API retornar 403, o código pulará para cá
      console.error("Falha ao adicionar item:", error);
      toast.error("Não foi possível adicionar o produto ao carrinho.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!user) {
      setCart((prevCart) =>
        prevCart.filter((item) => item.product.id !== productId)
      );
      return;
    }

    const itemToRemove = cart.find((item) => item.product.id === productId);
    if (!itemToRemove) return;

    setIsLoading(true);
       try {
      await api.delete(`/api/carts/item/${itemToRemove.id}`);
      
      toast.success("Produto removido do carrinho.");
      await fetchUserCart();
    } catch (error) {
      console.error("Falha ao remover item:", error);
      toast.error("Não foi possível remover o produto.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    setIsLoading(true);
     try {
      await api.delete('/api/carts');

      setCart([]);
      toast.success("Carrinho esvaziado com sucesso.");
    } catch (error) {
      console.error("Falha ao limpar o carrinho:", error);
      toast.error("Não foi possível esvaziar o carrinho.");
    } finally {
      setIsLoading(false);
    }
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const price = Number(item.product.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
