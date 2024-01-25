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
  }
)
router.get(
  "/account",
  passport.authenticate("jwt", { session: true }),
  checkRoles("user", "admin", "client"),
  async (req:any, res, next) => {
    try {
      const id = req.user.sub;
      const rta = await service.getById(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
)
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
  }
)
router.patch(
  "/edit",
  passport.authenticate("jwt", { session: true }),
  validatorHandler(getUserSchema, "params"),
  async (req: any, res, next) => {
    try{
      const username = req.user.sub;
      const body = req.body;
      const rta = await service.updateOne(username, body);
      res.status(200).json(rta);
    }catch(error){
      next(error)
    }
  }
)
router.delete(
  "/",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    res.send("(DELETE) users/");
  }
)

export default router;
