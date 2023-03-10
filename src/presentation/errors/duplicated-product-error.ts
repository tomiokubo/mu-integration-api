export class DuplicatedProductError extends Error {
  constructor() {
    super("The received product reference already exists");
    this.name = "DuplicatedProduct";
  }
}
