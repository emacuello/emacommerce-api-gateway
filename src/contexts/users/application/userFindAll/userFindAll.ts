import { PrimitiveUser } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';

export class UserFindAllUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(): Promise<{ users: Partial<PrimitiveUser>[] }> {
    const users = await this.userRepository.findAll();

    return { users: users.map((user) => user.toValue()) };
  }
}
