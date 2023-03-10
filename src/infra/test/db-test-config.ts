import { DataSourceOptions } from "typeorm";

export const dbTestConfig: DataSourceOptions = {
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  dropSchema: true,
  subscribers: [],
  migrations: [],
};
