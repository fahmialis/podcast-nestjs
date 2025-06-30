import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { RegisterDto } from './dto/register';
import { LoginDto } from './dto/login';

@Injectable()
export class AuthService {
  private users: User[] = [];

  register(user: RegisterDto) {
    const sameEmail = this.users.find((u) => u.email === user.email);

    if (sameEmail) {
      throw new BadRequestException('Email already exists');
    }

    this.users.push({
      ...user,
      id: this.users.length + 1,
    });

    return true;
  }

  login(user: LoginDto) {
    const found = this.users.find((u) => u.name === user.name);

    if (!found) {
      throw new BadRequestException('User not found');
    }

    return true;
  }
}
