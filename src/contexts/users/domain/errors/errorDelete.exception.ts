export class ErrorDeleteException extends Error {
  constructor(public readonly id: string) {
    super(`Error al eliminar el usuario con el id ${id}`);
  }
}
