export interface PrimitivePayment {
  id?: string;
  amount: number;
  status?: string;
  products: Product[];
  user: User;
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
interface User {
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
