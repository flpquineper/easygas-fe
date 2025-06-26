import type { CartItem } from "./cartItem";

// Representa o carrinho do usuário
export type Cart = {
  id?: number;                
  userId?: number;            
  items: CartItem[];          
};