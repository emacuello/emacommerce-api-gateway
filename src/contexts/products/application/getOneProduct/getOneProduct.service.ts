import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PrimitiveProduct } from '../../domain/entities/Products';
import { NotFoundProductException } from '../../domain/errors/notFoundProduct';
import { ProductsRepository } from '../../domain/repository/products.repository';

@Injectable()
export class GetOneProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async run(id: string): Promise<Partial<PrimitiveProduct>> {
    const result = await this.productsRepository.findById(id);
    if (!result) throw new NotFoundProductException('Product not found');
    return result.toValue();
  }
}
