import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma.service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const authCookie = request.cookies['auth_token'];

    const userId = await this.validateTokenAndGetUserId(authCookie);
    const user = await this.getUserFromId(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    request.currentUser = user;

    return true;
  }

  async getUserFromId(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async validateTokenAndGetUserId(token: string) {
    if (!token) {
      throw new UnauthorizedException();
    }

    const { userId } = jwt.verify(
      token,
      process.env.TOKEN_SECRET,
    ) as JwtPayload & { userId: string };

    if (!userId) {
      throw new UnauthorizedException();
    }

    return userId;
  }
}
