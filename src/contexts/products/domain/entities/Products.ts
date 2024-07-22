export interface PrimitiveProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl?: string;
  category: string;
}

export class Product {
  constructor(public readonly attributes: PrimitiveProduct) {}

  static create(dto: PrimitiveProduct): Product {
    return new Product(dto);
  }

  toValue(): Partial<PrimitiveProduct> {
    return this.attributes;
  }
}

export class UpdateProduct {
  constructor(public readonly attributes: Partial<PrimitiveProduct>) {}
  static create(dto: Partial<PrimitiveProduct>): UpdateProduct {
    return new UpdateProduct(dto);
  }
  toValue(): Partial<PrimitiveProduct> {
    return this.attributes;
  }
}
