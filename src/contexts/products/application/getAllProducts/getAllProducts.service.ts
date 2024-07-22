import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PrimitiveProduct } from '../../domain/entities/Products';
import { ProductsRepository } from '../../domain/repository/products.repository';

@Injectable()
export class GetAllProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async run(): Promise<Partial<PrimitiveProduct>[]> {
    const result = await this.productsRepository.findAll();
    return result.map((product) => product.toValue());
  }
}
