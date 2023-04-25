import { Express } from "express";
import product from "../routes/product-routes";
import cargo from "../routes/cargo-routes";

export default (app: Express): void => {
  app.use("/product/", product);
  app.use("/cargo/", cargo);
};
