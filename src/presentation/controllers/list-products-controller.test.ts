import { Product } from "@/domain/models/product-model";
import faker from "faker";
import { badRequest, noContent, ok, serverError } from "../helpers";
import { ListProductsSpy } from "../test/mocks/mock-products";
import { ValidationSpy } from "../test/mocks/mock-validaton";
import { ListProductsController } from "./list-products-controller";

const makeSut = () => {
  const listProductsSpy = new ListProductsSpy();
  const validationSpy = new ValidationSpy();
  const sut = new ListProductsController(validationSpy, listProductsSpy);
  return { sut, listProductsSpy, validationSpy };
};

const mockProduct = (): Product => {
  return {
    id: faker.datatype.number(),
    reference: faker.datatype.number().toString(),
    code: faker.datatype.number().toString(),
    description: faker.lorem.sentence(),
    unit: "M2",
    supplier: faker.company.companyName(),
    packageAmount: faker.datatype.float(),
    weight: faker.datatype.float(),
    height: faker.datatype.float(),
    width: faker.datatype.float(),
    length: faker.datatype.float(),
    ncm: faker.datatype.number.toString(),
    batchControl: true,
  };
};

describe("ListProductsController", () => {
  it("should call Validation with correct values", async () => {
    const { sut, validationSpy } = makeSut();
    const code = faker.datatype.number().toString();
    await sut.handle({ code });
    expect(validationSpy.input).toEqual({ code });
  });

  it("should return 400 if validation return error", async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new Error();
    const code = faker.datatype.number().toString();
    const result = await sut.handle({ code });
    expect(result).toEqual(badRequest(new Error()));
  });

  it("should call ListProducts with correct values", async () => {
    const { sut, listProductsSpy } = makeSut();
    const reference = faker.datatype.number().toString();
    await sut.handle({ reference });
    expect(listProductsSpy.filterOptions).toEqual({ reference });
    await sut.handle();
    expect(listProductsSpy.filterOptions).toBeFalsy();
  });

  it("should return 500 if ListProducts throws", async () => {
    const { sut, listProductsSpy } = makeSut();
    jest.spyOn(listProductsSpy, "list").mockImplementationOnce(() => {
      throw new Error();
    });
    const result = await sut.handle();
    expect(result).toEqual(serverError(new Error()));
  });

  it("should return 204 if ListProducts returns an empty array", async () => {
    const { sut, listProductsSpy } = makeSut();
    listProductsSpy.result = [];
    const result = await sut.handle();
    expect(result).toEqual(noContent());
  });

  it("should return 200 on sucess", async () => {
    const { sut, listProductsSpy } = makeSut();
    const list = [mockProduct(), mockProduct(), mockProduct()];
    listProductsSpy.result = list;
    const result = await sut.handle();
    expect(result).toEqual(ok(list));
  });
});
