import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './input/createUser';
import { PrismaService } from '../prisma.service';
import { SafeUser } from '../user/user';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(userData: CreateUserInput) {
    const { password } = userData;
    const hashedPassword = await bcrypt.hash(password, 8);

    return new SafeUser(
      await this.prisma.user.create({
        data: { ...userData, password: hashedPassword },
      }),
    );
  }
}
