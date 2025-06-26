import type { Product } from "./product";

// Representa um item do carrinho
export type CartItem = {       
  product: Product;           
  quantity: number;     
};