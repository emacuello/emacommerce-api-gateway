import { ErrorDeleteException } from '../../domain/errors/errorDelete.exception';
import { UsersRepository } from '../../domain/repository/users.repository';
import { UserFindDeleteDto } from './userDelete.dto';
import { Injectable } from 'src/utils/dependencyInject/injectable';

@Injectable()
export class UserDeleteUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async run(dto: UserFindDeleteDto): Promise<string> {
    const result = await this.userRepository.delete(dto.id);
    if (!result) throw new ErrorDeleteException(dto.id);
    return result;
  }
}
