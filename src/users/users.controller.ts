import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/get_all')
  getAllUsers() {
    return this.usersService.getUsers();
  }
}
