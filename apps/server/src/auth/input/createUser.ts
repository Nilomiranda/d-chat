import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserInput {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsStrongPassword()
  password: string;
}
