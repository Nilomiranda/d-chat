import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserInput } from './input/createUser';
import { AuthService } from './auth.service';
import { CreateSessionInput } from './input/createSession';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  async signIn(
    @Body() loginData: CreateSessionInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.service.signIn(loginData, response);
  }

  @Post('signup')
  async signUp(@Body() userData: CreateUserInput) {
    return this.service.signUp(userData);
  }
}
