import { Router } from "express";
import Service from "../services/service.service";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.handler";
import validatorHandler from "../middlewares/validator.handler";
import { createServiceSchema, findServiceSchema } from "../schemas/services.schema";

const service = new Service();
const router = Router();

router.get(
  "/",
   async (req, res, next) => {
    try {
      const services = await service.find();
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
  async (req, res, next) => {
    try {
      const body = req.body;
      const rta = await service.create(body);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);
router.get(
  "/:id",
  validatorHandler(findServiceSchema,"params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.findById(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);
router.patch("/:id", async (req, res, next) => {
  try{
    const {id} = req.params
    const rta = await service.updateById(id)
    res.json(rta)
  }catch(error){
    next(error)
  }
})

export default router;
