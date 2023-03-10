export class DuplicatedCargoError extends Error {
  constructor() {
    super("The received cargo number is duplicated");
    this.name = "Duplicated cargo number";
  }
}
