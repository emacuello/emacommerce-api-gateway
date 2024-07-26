export interface ProductId {
  id: string;
}
export interface UserDto {
  id: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  phone?: number;
  country?: string;
  address?: string;
  city?: string;
  role?: string;
  birthdate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class CreatePaymentDto {
  user: UserDto;
  amount: number;
  products: ProductId[];
}
