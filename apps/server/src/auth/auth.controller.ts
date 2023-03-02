import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInput } from './input/createUser';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   * TODO: CreateUserInput class must be initiated to be validated
   * with the class's decorators
   */
  @Post('signup')
  async signUp(@Body() userData: CreateUserInput) {
    return this.service.signUp(userData);
  }
}
