export class DuplicatedReceiptError extends Error {
  constructor(private readonly nfs: string[]) {
    super("The received receipt reference already exists");
    this.name = "DuplicatedReceipt";
  }
}
