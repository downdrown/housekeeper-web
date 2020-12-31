import { Role } from './roles';

export class User {
  id: number | undefined;
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  role: Role | undefined;
  lastLogin: Date | undefined;
  registrationPassword: string | undefined;
}
