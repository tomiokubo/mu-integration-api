import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeListProductsController } from "../factories/controllers/list-products-controller-factory";

const router = Router();

router.get("/", adaptRoute(makeListProductsController()));

export default router;
