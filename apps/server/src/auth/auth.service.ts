import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './input/createUser';
import { PrismaService } from '../prisma.service';
import { SafeUser } from '../user/user';
import { CreateSessionInput } from './input/createSession';

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

  async signIn(signInData: CreateSessionInput) {
    const { email, password } = signInData;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('User not found.');
    }

    return new SafeUser(user);
  }
}
