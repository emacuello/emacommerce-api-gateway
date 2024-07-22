import { Injectable } from 'src/utils/dependencyInject/injectable';
import { UpdateProduct } from '../../domain/entities/Products';
import { ProductsRepository } from '../../domain/repository/products.repository';
import { UpdateProductDto } from './updateProducts.dto';

@Injectable()
export class UpdateProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async run(product: UpdateProductDto, id: string): Promise<string> {
    return await this.productsRepository.update(
      UpdateProduct.create(product),
      id,
    );
  }
}
