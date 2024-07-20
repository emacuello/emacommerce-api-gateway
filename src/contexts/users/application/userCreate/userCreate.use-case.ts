import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PrimitiveUser, User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { UserCreateDtos } from './userCreate.dto';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserCreateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  run(dto: UserCreateDtos): Observable<{ user: Partial<PrimitiveUser> }> {
    const $user = User.create(dto);
    const user = this.userRepository.save($user);
    return user.pipe(map((user) => ({ user: user.toValue() })));
  }
}
