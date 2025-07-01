'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import type { CartItem } from '@/types/cartItem';
import type { Product } from '@/types/product';
import { useAuth } from './AuthContext';

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
  const { user, token } = useAuth();

  const fetchUserCart = useCallback(async () => {
    if (!user || !token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:3305/api/carts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Não foi possível buscar o carrinho do usuário.');
      
      const data = await res.json();
      setCart(data.items || []);
    } catch (error) {
      console.error("Falha ao buscar carrinho da API:", error);
      setCart([]);
    } finally {
      setIsLoading(false);
    }
  }, [user, token]);

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
      const existingItem = cart.find(item => item.product.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = cart.map(item =>
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
            cartId: 0
        };
        newCart = [...cart, newCartItem];
      }
      setCart(newCart);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      await fetch(`http://localhost:3305/api/carts/item`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ productId: product.id, quantity }),
      });
      await fetchUserCart();
    } catch (error) {
      console.error("Falha ao adicionar item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!user) {
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
      return;
    }
    
    const itemToRemove = cart.find(item => item.product.id === productId);
    if (!itemToRemove) return;

    setIsLoading(true);
    try {
      await fetch(`http://localhost:3305/api/carts/item/${itemToRemove.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      await fetchUserCart();
    } catch (error) {
      console.error("Falha ao remover item:", error);
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
      await fetch(`http://localhost:3305/api/carts`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setCart([]);
    } catch (error) {
      console.error("Falha ao limpar o carrinho:", error);
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
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}