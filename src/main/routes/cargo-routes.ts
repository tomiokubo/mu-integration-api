import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeListProductsController } from "../factories/controllers/list-products-controller-factory";
import { makeLoadCargoController } from "../factories/controllers/load-cargo-controller-factory";

const router = Router();

router.get("/", adaptRoute(makeLoadCargoController()));

export default router;
