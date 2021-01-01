export class Token {

  constructor(username: string, permissions: string[]) {
    this.#_username = username;
    this.#_permissions = permissions;
  }

  #_username: string;
  #_permissions: string[];

  get username(): string {
    return this.#_username;
  }

  get permissions(): string[] {
    return this.#_permissions;
  }
}
