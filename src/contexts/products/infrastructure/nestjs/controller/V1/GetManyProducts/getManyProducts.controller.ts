import { BadRequestException, Controller, Get } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { GetAllProductsService } from 'src/contexts/products/application/getAllProducts/getAllProducts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class GetManyProductsController {
  constructor(private readonly getManyProductsService: GetAllProductsService) {}

  @ApiOperation({ summary: 'Obtener todos los productos' })
  @Get()
  async getMany() {
    try {
      return await this.getManyProductsService.run();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
