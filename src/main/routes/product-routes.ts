import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeListProductsByManyCodesController } from "../factories/controllers/list-products-by-many-codescontroller-factory";
import { makeListProductsController } from "../factories/controllers/list-products-controller-factory";

const router = Router();

router.get("/", adaptRoute(makeListProductsController()));
router.get("/many", adaptRoute(makeListProductsByManyCodesController()));

export default router;
