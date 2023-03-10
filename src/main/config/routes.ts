import { Express } from "express";
import product from "../routes/product-routes";

export default (app: Express): void => {
  app.use("/product/", product);
};
