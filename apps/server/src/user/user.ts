import { BaseEntity } from '../common/baseEntity';
import { Exclude } from 'class-transformer';

export class SafeUser extends BaseEntity<SafeUser> {
  name: string;
  email: string;

  @Exclude()
  password: string;
}
