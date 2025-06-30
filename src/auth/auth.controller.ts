import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { RegisterDto } from './dto/register';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    this.authService.register(body);

    return {
      message: 'User is registered sucessfully',
    };
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    this.authService.login(body);

    return {
      message: 'User found',
      token: 'token',
    };
  }
}
