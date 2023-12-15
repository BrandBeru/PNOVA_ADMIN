import express, { Express, Request, Response } from "express";
import routerApi from "./routes";
import mongoConnection from "./libs/mongoose";
import config from "./config/config";

import {
  boomErrorHandler,
  errorHandler,
  logError,
  ormErrorHandler,
} from "./middlewares/error.handler";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import { join } from "path";
import { createServer } from "http";

const app: Express = express();
const server = createServer(app)
const host: any = config.host;
const port: any = config.port || 3000;

app.set("trust proxy", 1);
const secret: any = config.jwtSecret;
const days = 1000*60*60*24*15
const sessionMidddleware = session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: days}
})
app.use(sessionMidddleware);
mongoConnection();

/**
 * Chat section
 */
app.use(express.json());

const whiteList = ["http://localhost:5500", "http://127.0.0.1:5500", "*"];
const options = {
  origin: (req: any, callback: any) => {
    if (whiteList.includes(req)) {
      callback(null, true);
      return;
    }
    callback(null, true);
  },
};
app.use(cors(options));

app.get("/", (req: Request, res: Response) => {
  res.send('PNOVA\\VIGE STUDIOS')
});
require("./utils/auth");
routerApi(app, server);

app.use(passport.initialize());
app.use(passport.session());
app.use(logError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


server.listen(port, () => {
  console.log(`🌐[server]: Server is running at ${host}:${port}`);
});
