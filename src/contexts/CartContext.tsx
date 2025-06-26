'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem } from '@/types/cartItem';

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

 const addToCart = (item: CartItem) => {
  setCart(prev => {
    if (!item?.product?.id) return prev;
    const existing = prev.find(i => i.product.id === item.product.id);
    if (existing) {
      return prev.map(i =>
        i.product.id === item.product.id
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    }
    return [...prev, item];
  });
};

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
