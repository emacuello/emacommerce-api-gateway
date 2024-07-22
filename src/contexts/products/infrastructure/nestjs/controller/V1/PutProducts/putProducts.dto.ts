import { PartialType } from '@nestjs/swagger';
import { ProductsDtos } from '../PostProducts/postProduct.dto';

export class PutProductDto extends PartialType(ProductsDtos) {}
