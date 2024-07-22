import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { CreateProductService } from 'src/contexts/products/application/createProduct/createProduct.service';
import { ProductsDtos } from './postProduct.dto';
import { ErrorDeleteProductException } from 'src/contexts/products/domain/errors/errorDeleted';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class PostProductsController {
  constructor(private readonly createProductService: CreateProductService) {}

  @Post()
  async create(@Body() createProductDto: ProductsDtos) {
    try {
      return await this.createProductService.run(createProductDto);
    } catch (error) {
      if (error instanceof ErrorDeleteProductException) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
