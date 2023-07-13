"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const db_helper_1 = require("./infra/db/pg/db-helper");
const app_1 = require("./main/config/app");
db_helper_1.DbHelper.makeAppDataSource();
const AppDataSource = db_helper_1.DbHelper.getAppDataSource();
const port = process.env.PORT;
AppDataSource === null || AppDataSource === void 0 ? void 0 : AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = yield (0, app_1.setupApp)();
    app.listen(port, () => {
        //console.log(`Server running on port ${port}`);
    });
})).catch((error) => console.log(error));
