"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbTestConfig = void 0;
exports.dbTestConfig = {
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    dropSchema: true,
    subscribers: [],
    migrations: [],
};
