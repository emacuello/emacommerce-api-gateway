import { Module } from '@nestjs/common';
import { UsersModule } from './contexts/users/infrastructure/nestjs/module/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
