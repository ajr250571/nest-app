import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const plainToHash = await hash(data.password, 10);
    data.password = plainToHash;
    const createdUser = await this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return createdUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return users;
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async update(id: string, user: UpdateUserDto) {
    return await this.prisma.user.update({
      data: user,
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
