import {
  BadRequestException,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { DeleteProductService } from 'src/contexts/products/application/deleteProduct/deleteProduct.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDeleteProductException } from 'src/contexts/products/domain/errors/errorDeleted';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class DeleteProductsController {
  constructor(private readonly deleteProductService: DeleteProductService) {}

  @Delete(V1_ROUTES.USER.DELETE)
  @ApiResponse({ status: HttpStatus.OK, description: 'Producto eliminado' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.deleteProductService.run(id);
    } catch (error) {
      if (error instanceof ErrorDeleteProductException) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
