import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeListProductsByManyCodesController } from "../factories/controllers/list-products-by-many-codescontroller-factory";
import { makeListProductsController } from "../factories/controllers/list-products-controller-factory";
import { makeGetInventoryByCodesController } from "../factories/controllers/get-inventory-by-codes-controller-factory";

const router = Router();

router.get("/", adaptRoute(makeListProductsController()));
router.post("/many", adaptRoute(makeListProductsByManyCodesController()));
router.get("/inventory", adaptRoute(makeGetInventoryByCodesController()));

export default router;
