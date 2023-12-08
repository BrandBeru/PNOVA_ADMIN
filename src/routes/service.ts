import { Router } from "express";
import Service from "../services/service.service";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.handler";
import validatorHandler from "../middlewares/validator.handler";
import { createServiceSchema } from "../schemas/services.schema";

const service = new Service();
const router = Router();

router.get(
  "/",
  passport.authenticate("jwt"),
  checkRoles("admin"),
  (req, res, next) => {
    try {
      const services = service.find();
      res.json(services);
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  "/",
  validatorHandler(createServiceSchema, "body"),
  passport.authenticate("jwt"),
  checkRoles("admin"),
  (req, res, next) => {
    try {
      const body = req.body;
      const rta = service.create(body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);
router.get(
  "/:id",
  passport.authenticate("jwt"),
  checkRoles("admin"),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = service.findById(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
