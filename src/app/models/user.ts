import { Gender } from './genders';
import { Role } from './roles';

export class User {
  id: number | undefined;
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  gender: Gender | undefined;
  role: Role | undefined;
  lastLogin: Date | undefined;
  registrationPassword: string | undefined;
}
