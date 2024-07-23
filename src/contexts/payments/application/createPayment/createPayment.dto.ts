export interface ProductId {
  id: string;
}
export class CreatePaymentDto {
  amount: number;
  products: ProductId[];
}
