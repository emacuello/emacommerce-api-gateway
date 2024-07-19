import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PrimitiveUser, User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { UserCreateDtos } from './userCreate.dto';

@Injectable()
export class UserCreateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserCreateDtos): Promise<{ user: Partial<PrimitiveUser> }> {
    const user = User.create(dto);
    await this.userRepository.save(user);

    return { user: user.toValue() };
  }
}
