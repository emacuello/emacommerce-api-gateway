import { USER_SERVICE } from 'src/utils/ms/msNames';
import { User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Inject } from '@nestjs/common';

export class UserMicroservice extends UsersRepository {
  constructor(@Inject(USER_SERVICE) private client: ClientProxy) {
    super();
  }
  async save(user: User): Promise<Observable<any>> {
    const result = await this.client.send({ cmd: 'createUser' }, user);

    return result;
  }
  async delete(id: string): Promise<void> {}

  async findAll(): Promise<User[]> {}

  async findById(email: string): Promise<User> {}

  async update(user: User): Promise<void> {}
}
