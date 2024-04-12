import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Armando',
      phone: '123456',
    },
    {
      id: 2,
      name: 'Javier',
      phone: '123456',
    },
  ];
  getUsers() {
    return this.users;
  }
}
