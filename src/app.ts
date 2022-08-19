import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { DevelfoodController } from "./develfood.controller";
import { DevelfoodService } from "./services/develfood.service";
import mongoose from "mongoose";
import { MONGO_URL } from "./constants/develfoodApi.constants";

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

class App {
  public app: Application;

  constructor() {
    this.app = express();
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
    const develfoodController = new DevelfoodController(new DevelfoodService());

    this.app.use("/develfood", develfoodController.router);
  }
}

export default new App().app;
