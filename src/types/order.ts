export interface Order {
  id: number;
  userId: number;
  paymentMethodId: number;
  deliveryManId?: number | null;
  statusId: number;
  orderDate: string;
  orderNote?: string | null;
  deliveryTime?: string | null;

  user: {
    id: number;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    cpf?: string | null;
    address?: string | null;
    complementAddress: string;
  };

  paymentMethod: {
    id: number;
    methodName: string;
  };

  deliveryMan?: {
    id: number;
    name?: string | null;
    email?: string | null;
  } | null;

  status: {
    id: number;
    statusName: string;
  };

  items: Array<{
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: string;
    product: {
      id: number;
      name?: string | null;
      price: string;
      image?: string | null;
    };
  }>;

  statusHistory: Array<{
    id: number;
    orderId: number;
    statusId: number;
    changedAt: string;
    status: {
      id: number;
      statusName: string;
    };
  }>;
}