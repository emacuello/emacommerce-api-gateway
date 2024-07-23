import { Module } from '@nestjs/common';
import { UsersModule } from './contexts/users/infrastructure/nestjs/module/users.module';
import { AuthModule } from './contexts/auth/infrastructure/nestjs/module/auth.module';
import { ProductModule } from './contexts/products/infrastructure/nestjs/module/product.module';
import { PaymentsModule } from './contexts/payments/infrastructure/nestjs/module/payments.module';

@Module({
  imports: [UsersModule, AuthModule, ProductModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
