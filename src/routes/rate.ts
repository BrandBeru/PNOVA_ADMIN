import { Router } from "express";
import RateService from "../services/rate.service";
import validatorHandler from "../middlewares/validator.handler";
import { createRateSchema, findRateByUserSchema } from "../schemas/rate.schema";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.handler";

const service = new RateService();
const router = Router();

router.post(
  "/",
  validatorHandler(createRateSchema, "body"),
  passport.authenticate("jwt"),
  checkRoles("client"),
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
router.get("/", (req:any, res:any, next) => {
  try{
    const skip = req.params.skip
    const limit = req.params.limit
    const rta = service.find(skip, limit);
    res.json(rta);
  }catch(error){
    next(error)
  }
});
router.get("/:level",
validatorHandler(findRateByUserSchema, "params"),
(req:any, res:any, next) => {
  try{
    const skip = req.params.skip
    const limit = req.params.limit
    const ascend = req.params.asc
    const {level} = req.params
    const rta = service.findByRate(level, ascend, skip, limit)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.get(
  "/user",
  validatorHandler(findRateByUserSchema, "params"),
  passport.authenticate("jwt"),
  checkRoles("client"),
  (req:any, res, next) => {
    try{
      const id = req.user.sub
      const rta = service.findByUserId(id)
      res.json(rta)
    }catch(error){
      next(error)
    }
  }
);
router.get(
  "/user/:id",
  validatorHandler(findRateByUserSchema, "params"),
  passport.authenticate("jwt"),
  checkRoles("admin"),
  (req:any, res, next) => {
    try{
      const id = req.user.sub
      const rta = service.findByUserId(id)
      res.json(rta)
    }catch(error){
      next(error)
    }
  }
);
router.get(
  "/service/:id",
  validatorHandler(findRateByUserSchema, "params"),
  (req, res, next) => {
    const {id} = req.params
    const rta = service.findByServiceId(id)
    res.json(rta)
  }
)

export default router;
