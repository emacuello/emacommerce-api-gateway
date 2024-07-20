import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PrimitiveUser } from '../../domain/entities/Users';
import { UserNotFoundException } from '../../domain/errors/not-found.exception';
import { UsersRepository } from '../../domain/repository/users.repository';
import { UserFindOneByIdDtos } from './userFindOnebyId.dto';

@Injectable()
export class UserFindOneByIdUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserFindOneByIdDtos): Promise<Partial<PrimitiveUser>> {
    const user = await this.userRepository.findById(dto.id);
    if (!user) {
      throw new UserNotFoundException(dto.id);
    }

    return user.toValue();
  }
}
