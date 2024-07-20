import { Injectable } from 'src/utils/dependencyInject/injectable';
import { User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { UserFindUpdateDto } from './userUpdate.dto';

@Injectable()
export class UserUpdateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserFindUpdateDto, id: string): Promise<void> {
    const user = new User(dto);

    await this.userRepository.update(user, id);
  }
}
