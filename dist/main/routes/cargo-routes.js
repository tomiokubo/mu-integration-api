"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const load_cargo_controller_factory_1 = require("../factories/controllers/load-cargo-controller-factory");
const router = (0, express_1.Router)();
router.get("/", (0, express_route_adapter_1.adaptRoute)((0, load_cargo_controller_factory_1.makeLoadCargoController)()));
exports.default = router;
