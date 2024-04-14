import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(user: CreateUserDto) {
    return this.prisma.user.create({ data: user });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  update(id: string, user: UpdateUserDto) {
    return this.prisma.user.update({
      data: user,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
