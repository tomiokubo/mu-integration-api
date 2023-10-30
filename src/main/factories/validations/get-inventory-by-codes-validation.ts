import { Validation } from "@/presentation/protocols/validation";
import {
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation/validators";

export const makeGetInventoryByCodesValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["codes"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
