import { UsersRepository } from '../../domain/repository/users.repository';
import { UserFindDeleteDto } from './userDelete.dto';
import { Injectable } from 'src/utils/dependencyInject/injectable';

@Injectable()
export class UserDeleteUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserFindDeleteDto): Promise<void> {
    await this.userRepository.delete(dto.id);
  }
}
