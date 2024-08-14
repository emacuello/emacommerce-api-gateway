import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './contexts/users/infrastructure/nestjs/module/users.module';
import { AuthModule } from './contexts/auth/infrastructure/nestjs/module/auth.module';
import { ProductModule } from './contexts/products/infrastructure/nestjs/module/product.module';
import { PaymentsModule } from './contexts/payments/infrastructure/nestjs/module/payments.module';
import { PrometheusCustomModule } from './metrics/metrics.module';
import { BasicAuthMiddleware } from './utils/middleware/basicauth.middleware';
import * as morgan from 'morgan';
import { JwtConfigModule } from './config/jwt.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductModule,
    PaymentsModule,
    PrometheusCustomModule,
    JwtConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('dev')).forRoutes('*');
    consumer.apply(BasicAuthMiddleware).forRoutes('metrics');
  }
}
