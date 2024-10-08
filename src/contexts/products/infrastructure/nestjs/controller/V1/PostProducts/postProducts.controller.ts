import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { CreateProductService } from 'src/contexts/products/application/createProduct/createProduct.service';
import { ProductsDtos } from './postProduct.dto';
import { ErrorDeleteProductException } from 'src/contexts/products/domain/errors/errorDeleted';
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
export class PostProductsController {
  constructor(private readonly createProductService: CreateProductService) {}

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Producto creado correctamente',
  })
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
