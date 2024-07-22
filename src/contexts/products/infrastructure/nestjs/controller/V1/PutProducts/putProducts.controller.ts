import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { PutProductDto } from './putProducts.dto';
import { UpdateProductService } from 'src/contexts/products/application/updateProduct/updateProduct.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class PutProductsController {
  constructor(private readonly updateProductService: UpdateProductService) {}

  @Put(V1_ROUTES.USER.UPDATE)
  async update(
    @Body() body: PutProductDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      return await this.updateProductService.run(body, id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
