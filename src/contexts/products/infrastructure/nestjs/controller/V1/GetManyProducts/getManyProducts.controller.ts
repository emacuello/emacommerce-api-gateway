import { BadRequestException, Controller, Get } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { GetAllProductsService } from 'src/contexts/products/application/getAllProducts/getAllProducts.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(V1_ROUTES.NAME)
@Controller(V1_ROUTES.BASE)
export class GetManyProductsController {
  constructor(private readonly getManyProductsService: GetAllProductsService) {}

  @Get()
  async getMany() {
    try {
      return await this.getManyProductsService.run();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
