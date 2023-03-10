import { Validation } from "@/presentation/protocols/validation";
import {
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation/validators";

export const makeListProductsValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["code"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
