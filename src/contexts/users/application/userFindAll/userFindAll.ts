import { PrimitiveUser } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { Injectable } from 'src/utils/dependencyInject/injectable';

@Injectable()
export class UserFindAllUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(): Promise<Partial<PrimitiveUser>[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => user.toValue());
  }
}
