import { Injectable } from 'src/utils/dependencyInject/injectable';
import { Product } from '../../domain/entities/Products';
import { ErrorCreateProductException } from '../../domain/errors/errorCreated';
import { ProductsRepository } from '../../domain/repository/products.repository';
import { CreateProductDto } from './createProduct.dto';

@Injectable()
export class CreateProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async run(product: CreateProductDto): Promise<string> {
    const result = await this.productsRepository.create(
      Product.create(product),
    );
    if (!result)
      throw new ErrorCreateProductException('No se pudo crear el producto');
    return result;
  }
}
