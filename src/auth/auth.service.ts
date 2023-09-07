import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// import { User } from '../model/user/entities/user.entity';
import { UserService } from '..//model/user/user.service';
import { User } from 'src/model/user/entities/user.entity';
import { UserPayload } from './model/UserPayload';

@Injectable()
export class AuthService {
  //   constructor(
  //     private usersService: User,
  //     private jwtService: JwtService,
  //   ) {}

  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: User) {
    const payload: UserPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  sigUp() {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUser(username);

    if (user) {
      const passwordValid = await bcrypt.compare(password, user.password_token);

      if (passwordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('User ou Senha invalidos');
  }
}
