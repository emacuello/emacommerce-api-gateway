import { Injectable } from 'src/utils/dependencyInject/injectable';
import { ErrorDeleteProductException } from '../../domain/errors/errorDeleted';
import { ProductsRepository } from '../../domain/repository/products.repository';

@Injectable()
export class DeleteProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async run(id: string): Promise<string> {
    const result = await this.productsRepository.delete(id);
    if (!result)
      throw new ErrorDeleteProductException('No se pudo borrar el producto');
    return result;
  }
}
