import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { GetOneProductService } from 'src/contexts/products/application/getOneProduct/getOneProduct.service';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundProductException } from 'src/contexts/products/domain/errors/notFoundProduct';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class GetOneProductsController {
  constructor(private readonly getOneProductService: GetOneProductService) {}

  @Get(V1_ROUTES.USER.FIND_ONE)
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.getOneProductService.run(id);
    } catch (error) {
      if (error instanceof NotFoundProductException)
        throw new BadRequestException(error.message);
    }
    throw new NotFoundException('Product not found');
  }
}
