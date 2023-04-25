import { Validation } from "@/presentation/protocols/validation";
import {
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation/validators";

export const makeLoadCargoValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["cargoReference"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
