import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PrimitiveUser, User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { UserCreateDtos } from './userCreate.dto';
import { ErrorCreateException } from '../../domain/errors/errorCreate.exception';

@Injectable()
export class UserCreateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserCreateDtos): Promise<Partial<PrimitiveUser>> {
    const $user = User.create(dto);
    const newUser = await this.userRepository.save($user);
    if (!newUser) throw new ErrorCreateException('Error al crear el usuario');
    return newUser.toValue();
  }
}
