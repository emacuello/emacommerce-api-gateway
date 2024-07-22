import { ClientProxy } from '@nestjs/microservices';
import {
  PrimitiveProduct,
  Product,
  UpdateProduct,
} from '../../domain/entities/Products';
import { ProductsRepository } from '../../domain/repository/products.repository';
import { firstValueFrom } from 'rxjs';
import { BadRequestException, Inject } from '@nestjs/common';
import { PRODUCT_SERVICE } from 'src/utils/ms/msNames';

export class MicroserviceRepository extends ProductsRepository {
  constructor(@Inject(PRODUCT_SERVICE) private client: ClientProxy) {
    super();
  }
  async create(product: Product): Promise<string> {
    const result = this.client.send('createProduct', product.toValue());
    try {
      return await firstValueFrom(result);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async delete(id: string): Promise<string> {
    const result = this.client.send('deleteProduct', { id });
    try {
      return await firstValueFrom(result);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findAll(): Promise<Product[]> {
    const result = this.client.send('getAllProducts', {});
    try {
      const products = (await firstValueFrom(result)) as PrimitiveProduct[];
      return products.map((product) => Product.create(product));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findById(id: string): Promise<Product> {
    const result = this.client.send('getOneProduct', { id });
    try {
      if ((await firstValueFrom(result)) === null) {
        throw new BadRequestException('Product not found');
      }
      return Product.create(await firstValueFrom(result));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async update(product: UpdateProduct, id: string): Promise<string> {
    const productToUpdate = product.toValue();
    productToUpdate.id = id;

    const result = this.client.send('updateProduct', productToUpdate);
    try {
      return await firstValueFrom(result);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
