export interface ProductId {
  id: string;
}
export class CreatePaymentDto {
  userId: string;
  amount: number;
  products: ProductId[];
}
