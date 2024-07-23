export interface PrimitivePayment {
  id?: string;
  amount: number;
  status?: string;
  products: Product[];
  createdAt?: Date;
  updatedAt?: Date;
}
interface Product {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imgUrl?: string;
  category?: string;
}

export class Payment {
  constructor(private readonly payment: PrimitivePayment) {}
  static create(payment: PrimitivePayment) {
    return new Payment(payment);
  }
  toValue() {
    return this.payment;
  }

  get amount(): number {
    return this.payment.amount;
  }
  get id(): string {
    return this.payment.id;
  }
}
