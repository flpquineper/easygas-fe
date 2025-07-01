import type { Product } from "./product";

export type CartItem = {
  id: number;
  quantity: number;
  cartId: number;
  productId: number;
  product: Product;  
};