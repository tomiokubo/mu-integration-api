import faker from "faker";
import { ListProductsFilterOptions } from "@/domain/usecases/list-products";
import { ListProductsRepositorySpy } from "../test/mock/db-product-mock";
import { DbListProducts } from "./list-products";
import { Product } from "@/domain/models/product-model";

const makeSut = () => {
  const listProductsRepositorySpy = new ListProductsRepositorySpy();
  const sut = new DbListProducts(listProductsRepositorySpy);
  return { sut, listProductsRepositorySpy };
};

const mockProduct = (): Product => {
  return {
    id: faker.datatype.number(),
    reference: faker.datatype.number().toString(),
    code: faker.datatype.number().toString(),
    description: faker.lorem.sentence(),
    unit: "M2",
    supplier: "Biancogres",
    packageAmount: 2.33,
    weight: 13.8,
    height: 13.8,
    width: 13.8,
    length: 13.8,
    ncm: "213132445",
    batchControl: true,
  };
};

const filterOptions: ListProductsFilterOptions = {
  reference: faker.datatype.number().toString(),
};

describe("ListProducts", () => {
  it("should call ListProductsRepository with correct values", async () => {
    const { sut, listProductsRepositorySpy } = makeSut();
    await sut.list(filterOptions);
    expect(listProductsRepositorySpy.filterOptions).toEqual(filterOptions);
  });

  it("should call ListProductsRepository without filterOption if this param is not passed", async () => {
    const { sut, listProductsRepositorySpy } = makeSut();
    await sut.list();
    expect(listProductsRepositorySpy.filterOptions).toBeFalsy();
  });

  it("should throw if ListProductsRepository throws", async () => {
    const { sut, listProductsRepositorySpy } = makeSut();
    jest.spyOn(listProductsRepositorySpy, "list").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.list();
    await expect(promise).rejects.toThrowError();
  });

  it("should return a list of Products on success", async () => {
    const { sut, listProductsRepositorySpy } = makeSut();
    const productList = [
      mockProduct(),
      mockProduct(),
      mockProduct(),
      mockProduct(),
    ];
    listProductsRepositorySpy.result = productList;
    const result = await sut.list();
    expect(result).toEqual(productList);
  });
});
