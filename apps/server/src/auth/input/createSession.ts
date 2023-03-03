import { IsEmail, IsString } from 'class-validator';

export class CreateSessionInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
