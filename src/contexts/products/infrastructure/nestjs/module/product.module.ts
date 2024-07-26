import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CreateProductService } from 'src/contexts/products/application/createProduct/createProduct.service';
import { DeleteProductService } from 'src/contexts/products/application/deleteProduct/deleteProduct.service';
import { GetAllProductsService } from 'src/contexts/products/application/getAllProducts/getAllProducts.service';
import { GetOneProductService } from 'src/contexts/products/application/getOneProduct/getOneProduct.service';
import { UpdateProductService } from 'src/contexts/products/application/updateProduct/updateProduct.service';
import { ProductsRepository } from 'src/contexts/products/domain/repository/products.repository';
import { MicroserviceRepository } from '../../ms/Microservice.repository';
import { DeleteProductsController } from '../controller/V1/DeleteProducts/deleteProducts.controller';
import { GetManyProductsController } from '../controller/V1/GetManyProducts/getManyProducts.controller';
import { GetOneProductsController } from '../controller/V1/GetOneProducts/getOneProducts.controller';
import { PostProductsController } from '../controller/V1/PostProducts/postProducts.controller';
import { PutProductsController } from '../controller/V1/PutProducts/putProducts.controller';
import { productsMicroserviceConfig } from 'src/config/microservice.config';

@Module({
  imports: [ClientsModule.register([productsMicroserviceConfig])],
  controllers: [
    DeleteProductsController,
    GetManyProductsController,
    GetOneProductsController,
    PostProductsController,
    PutProductsController,
  ],
  providers: [
    CreateProductService,
    DeleteProductService,
    GetAllProductsService,
    GetOneProductService,
    UpdateProductService,
    MicroserviceRepository,
    {
      provide: ProductsRepository,
      useExisting: MicroserviceRepository,
    },
  ],
})
export class ProductModule {}
