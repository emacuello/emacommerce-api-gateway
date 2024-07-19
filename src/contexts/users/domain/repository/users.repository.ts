import { Observable } from 'rxjs';
import { User } from '../entities/Users';

export abstract class UsersRepository {
  abstract save(user: User): Promise<Observable<User>>;
  abstract findById(email: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract update(user: User): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
