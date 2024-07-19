import { UsersRepository } from '../../domain/repository/users.repository';
import { UserFindDeleteDto } from './userDelete.dto';

export class UserDeleteUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserFindDeleteDto): Promise<void> {
    await this.userRepository.delete(dto.id);
  }
}
