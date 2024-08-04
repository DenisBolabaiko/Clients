export interface ClientData {
  id: number;
  name: string;
  data?: string;
  number: string;
  country?: string;
  email: string;
  address?: {
    province?: string;
    street?: string;
  };
}
