import express, { Express, Request, Response } from "express";
import routerApi from "./routes";
import mongoConnection from "./libs/mongoose";
import config from "./config/config";
import { boomErrorHandler, errorHandler, logError, ormErrorHandler } from "./middlewares/error.handler";
import passport from "passport";
import session from "express-session";
import cors from 'cors'

const app: Express = express();
const host:any = config.host;
const port:any = config.port || 3000;

app.set('trust proxy', 1)
const secret:any = config.jwtSecret;
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
}))
mongoConnection()
app.use(express.json())

const whiteList = ['http://localhost:5500', 'http://127.0.0.1:5500', '*', 'null']
const options = {
  origin: (req:any, callback:any) => {
    if(whiteList.includes(req)){
      callback(null, true)
      return
    }
    callback(new Error('not allow to: ' + req), false)
  }
}
app.use(cors(options))

app.get("/", (req: Request, res: Response) => {
  res.send("BeruChat is working: Go to [/api/v1/auth/login] and get logged");
});
require('./utils/auth')
routerApi(app)

app.use(passport.initialize())
app.use(passport.session())
app.use(logError)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`🌐[server]: Server is running at ${host}:${port}`);
});

