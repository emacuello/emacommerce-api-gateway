import { Product, UpdateProduct } from '../entities/Products';

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<string>;
  abstract update(product: UpdateProduct, id: string): Promise<string>;
  abstract delete(id: string): Promise<string>;
  abstract findById(id: string): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
}
