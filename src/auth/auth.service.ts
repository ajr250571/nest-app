import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const userNew = await this.usersService.create(userObject);
    return userNew;
  }

  async login(loginDto: LoginAuthDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException();

    const isUser = await compare(loginDto.password, user.password);
    if (!isUser) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    return {
      access_token: 'Bearer ' + this.jwtService.sign(payload),
    };
  }
}
