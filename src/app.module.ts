import { Module } from '@nestjs/common';
import { UsersModule } from './contexts/users/infrastructure/nestjs/module/users.module';
import { AuthModule } from './contexts/auth/infrastructure/nestjs/module/auth.module';
import { ProductModule } from './contexts/products/infrastructure/nestjs/module/product.module';

@Module({
  imports: [UsersModule, AuthModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
