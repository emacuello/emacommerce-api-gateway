import { Module } from '@nestjs/common';
import { UsersModule } from './contexts/users/infrastructure/nestjs/module/users.module';
import { AuthModule } from './contexts/auth/infrastructure/nestjs/module/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
