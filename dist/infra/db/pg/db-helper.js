"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbHelper = void 0;
const typeorm_1 = require("typeorm");
require("dotenv").config();
exports.DbHelper = {
    dbConfig: {
        type: "mssql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 1433,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: true,
        subscribers: [],
        migrations: [],
        extra: {
            trustServerCertificate: true,
        },
    },
    appDataSource: undefined,
    makeAppDataSource(dataSourceOption) {
        if (dataSourceOption)
            this.dbConfig = dataSourceOption;
        this.appDataSource = new typeorm_1.DataSource(this.dbConfig);
    },
    getAppDataSource() {
        return this.appDataSource;
    },
};
