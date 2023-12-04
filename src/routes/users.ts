import express, { Router } from "express";
import UserService from "../services/user.service";
import {
  createUserSchema,
  findUserByName,
  getUserSchema,
} from "../schemas/users.schema";
import validatorHandler from "../middlewares/validator.handler";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.handler";
import MongooseHandler from "../middlewares/mongoose.handler";
import { UserSchema } from "../db/models/user.model";

const router: Router = express.Router();

const service = new UserService();

router.get(
  "/name/:name",
  validatorHandler(findUserByName, "params"),
  async (req, res, next) => {
    try {
      const { name } = req.params;
      const rta = await service.findByName(name);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);
router.get(
  "/:username",
  passport.authenticate("jwt", { session: true }),
  checkRoles("user", "admin"),
  async (req, res, next) => {
    try {
      const { username } = req.params;
      const rta = await service.findbyUsername(username);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.create(body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },
);
router.patch(
  "/edit",
  passport.authenticate("jwt", { session: true }),
  validatorHandler(getUserSchema, "params"),
  async (req: any, res, next) => {
    const username = req.user.sub;
    const body = req.body;
    const rta = service.updateOne(username, body);
    res.status(200).json(rta);
  },
);
router.delete(
  "/",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    res.send("(DELETE) users/");
  },
);

export default router;
