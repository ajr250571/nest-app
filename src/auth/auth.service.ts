import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const userNew = await this.usersService.create(registerAuthDto);
    return userNew;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginAuthDto.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    if (!user) throw new UnauthorizedException();

    const isUser = await compare(loginAuthDto.password, user.password);
    if (!isUser) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email, name: user.name };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: 'Bearer ' + token,
    };
  }
}
