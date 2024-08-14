import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { PutProductDto } from './putProducts.dto';
import { UpdateProductService } from 'src/contexts/products/application/updateProduct/updateProduct.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/utils/enums/role.enum';
import { RolesGuard } from 'src/utils/guards/authorization.guard';

@ApiTags(V1_ROUTES.NAME)
@ApiBearerAuth()
@Roles(Role.Admin)
@UseGuards(RolesGuard)
@Controller(V1_ROUTES.BASE)
export class PutProductsController {
  constructor(private readonly updateProductService: UpdateProductService) {}

  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Producto actualizado correctamente',
  })
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
