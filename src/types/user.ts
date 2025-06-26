export interface User {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  cpf?: string | null;
  address?: string | null;
  complementAddress: string | null;
}