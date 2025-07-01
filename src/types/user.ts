export interface User {
  id: number;
  name: string
  email: string
  phone?: string
  cpf: string
  address?: string 
  complementAddress?: string | null;
}

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  address: string;
  complementAddress: string;
};