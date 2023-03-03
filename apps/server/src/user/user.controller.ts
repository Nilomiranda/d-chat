import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SafeUser } from './user';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  @Get('me')
  async getUserProfile(@Request() req) {
    return new SafeUser(req.currentUser);
  }
}
