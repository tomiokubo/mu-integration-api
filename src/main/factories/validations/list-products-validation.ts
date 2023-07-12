import { Validation } from "@/presentation/protocols/validation";
import {
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation/validators";

export const makeListProductsValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  return new ValidationComposite(validations);
};
