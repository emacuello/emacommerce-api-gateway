export class ErrorUpdateException extends Error {
  constructor(public readonly id: string) {
    super(`Error al actualizar el usuario con el id ${id}`);
  }
}
