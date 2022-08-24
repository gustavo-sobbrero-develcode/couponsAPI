import "reflect-metadata";
import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { CouponsController } from "./controllers/coupons.controller";
import { CouponsRepository } from "./repositories/coupons.repository";
import mongoose from "mongoose";
import { MONGO_URL } from "./constants/develfoodApi.constants";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import { OrdersController } from "./controllers/orders.controller";
import { OrdersRepository } from "./repositories/orders.repository";

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {});
  }

  private setControllers() {
    const couponsController = new CouponsController(new CouponsRepository());
    const ordersController = new OrdersController(new OrdersRepository());

    this.app.use("/develfood", couponsController.router);
    this.app.use("/develfood", ordersController.router);
  }
}

export default new App().app;
