export class UserNotFoundException extends Error {
  constructor(public readonly id: string) {
    super(`Usuario con el id ${id} no existe`);
  }
}
