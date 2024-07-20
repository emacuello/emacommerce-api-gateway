import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PrimitiveUser } from '../../domain/entities/Users';
import { UserNotFoundException } from '../../domain/errors/not-found.exception';
import { UsersRepository } from '../../domain/repository/users.repository';
import { UserFindOneByIdDtos } from './userFindOnebyId.dto';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class UserFindOneByIdUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  run(dto: UserFindOneByIdDtos): Observable<{ user: Partial<PrimitiveUser> }> {
    return this.userRepository.findById(dto.id).pipe(
      map((user) => ({ user: user.toValue() })),
      catchError(() => {
        throw new UserNotFoundException(dto.id);
      }),
    );
  }
}
