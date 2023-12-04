import express, { Express, Request, Response } from "express";
import routerApi from "./routes";
import mongoConnection from "./libs/mongoose";
import config from "./config/config";
import { boomErrorHandler, errorHandler, logError, ormErrorHandler } from "./middlewares/error.handler";
import { checkApiKey } from "./middlewares/auth.handler";
import passport from "passport";
import session from "express-session";


const app: Express = express();
const host:any = config.host;
const port:any = config.port;

app.set('trust proxy', 1)
const secret:any = config.jwtSecret;
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
}))
mongoConnection()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.render("<body><h1>BeruChat is working: Go to [/api/v1/auth/login] and get logged</h1></body>", {title: 'EG-CHAT'});
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

