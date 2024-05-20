import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeLoadFiscalConfigController } from "../factories/controllers/load-fiscal-config-controller-factory";

const router = Router();

router.get("/", adaptRoute(makeLoadFiscalConfigController()));

export default router;
