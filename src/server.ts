import "reflect-metadata";
import { DbHelper } from "./infra/db/pg/db-helper";
import { setupApp } from "./main/config/app";

require("dotenv").config();

DbHelper.makeAppDataSource();

const AppDataSource = DbHelper.getAppDataSource();

const port = process.env.PORT;

AppDataSource?.initialize()
  .then(async () => {
    const app = await setupApp();
    app.listen(port, () => {
      //console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
