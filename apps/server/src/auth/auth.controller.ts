import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInput } from './input/createUser';
import { AuthService } from './auth.service';
import { CreateSessionInput } from './input/createSession';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  async signIn(@Body() loginData: CreateSessionInput) {
    return this.service.signIn(loginData);
  }

  @Post('signup')
  async signUp(@Body() userData: CreateUserInput) {
    return this.service.signUp(userData);
  }
}
