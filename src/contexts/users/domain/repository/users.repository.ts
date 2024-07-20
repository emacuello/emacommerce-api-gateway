import { User } from '../entities/Users';

export abstract class UsersRepository {
  abstract save(user: User): Promise<User>;
  abstract findById(email: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract update(user: Partial<User>, id: string): Promise<string>;
  abstract delete(id: string): Promise<string>;
}
