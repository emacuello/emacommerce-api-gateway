import { USER_SERVICE } from 'src/utils/ms/msNames';
import { User } from '../../domain/entities/Users';
import { UsersRepository } from '../../domain/repository/users.repository';
import { ClientProxy } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { Inject } from '@nestjs/common';

export class UserMicroservice extends UsersRepository {
  constructor(@Inject(USER_SERVICE) private client: ClientProxy) {
    super();
  }

  save(user: User): Observable<User> {
    const result = this.client.send({ cmd: 'createUser' }, user);

    return from(result);
  }
  async delete(id: string): Promise<Observable<void>> {
    const result = this.client.send({ cmd: 'deleteUser' }, id);
    return from(result);
  }

  findAll(): Observable<User[]> {
    const result = this.client.send({ cmd: 'findAllUsers' }, {});
    return from(result);
  }

  findById(id: string): Observable<User> {
    const result = this.client.send({ cmd: 'findUserById' }, id);
    return from(result);
  }

  async update(user: User): Promise<Observable<any>> {
    const result = this.client.send({ cmd: 'updateUser' }, user);
    return from(result);
  }
}
