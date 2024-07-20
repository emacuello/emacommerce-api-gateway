import { map, Observable } from 'rxjs';
import { PrimitiveUser } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { Injectable } from 'src/utils/dependencyInject/injectable';

@Injectable()
export class UserFindAllUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  run(): Observable<{ users: Partial<PrimitiveUser>[] }> {
    return this.userRepository.findAll().pipe(
      map((users) => ({
        users: users.map((user) => user.toValue()),
      })),
    );
  }
}
