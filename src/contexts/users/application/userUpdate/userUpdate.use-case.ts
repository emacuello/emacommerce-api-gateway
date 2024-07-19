import { User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { UserFindUpdateDto } from './userUpdate.dto';

export class UserUpdateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserFindUpdateDto): Promise<void> {
    const user = new User(dto);

    await this.userRepository.update(user);
  }
}
