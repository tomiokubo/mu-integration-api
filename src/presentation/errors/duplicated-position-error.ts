export class DuplicatedPositionError extends Error {
  constructor() {
    super("The received position reference already exists");
    this.name = "DuplicatedPosition";
  }
}
