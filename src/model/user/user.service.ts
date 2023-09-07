import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = Math.floor(Math.random() * 10) + 1;

    await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password_token: await bcrypt.hash(createUserDto.password, 10),
        salt: salt.toString(),
      },
    });

    return {
      ...createUserDto,
      password: undefined,
    };
  }

  findOne(user: string) {
    return `This action returns a #${user} user`;
  }
}
