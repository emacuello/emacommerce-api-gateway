import { Observable } from 'rxjs';
import { User } from '../entities/Users';

export abstract class UsersRepository {
  abstract save(user: User): Observable<User>;
  abstract findById(email: string): Observable<User>;
  abstract findAll(): Observable<User[]>;
  abstract update(user: Partial<User>, id: string): Promise<Observable<any>>;
  abstract delete(id: string): Promise<Observable<void>>;
}
