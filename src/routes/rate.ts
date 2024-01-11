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
  async (req:any, res, next) => {
    try {
      const userId = req.user.id
      const body = req.body;
      const rta = await service.create({
        ...body,
        userId,
      });
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);
router.get("/", async (req:any, res:any, next) => {
  try{
    const skip = req.params.skip
    const limit = req.params.limit
    const rta = await service.find(skip, limit);
    res.json(rta);
  }catch(error){
    next(error)
  }
});
router.get("/level/:level",
validatorHandler(findRateByUserSchema, "params"),
async (req:any, res:any, next) => {
  try{
    const skip = req.params.skip
    const limit = req.params.limit
    const ascend = req.params.asc
    const {level} = req.params
    const rta = await service.findByRate(level, ascend, skip, limit)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.get(
  "/me",
  passport.authenticate("jwt"),
  checkRoles("client"),
  async (req:any, res, next) => {
    try{
      const id = req.user.sub
      const rta = await service.findByUserId(id)
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
  async (req, res, next) => {
    try{
      const {id} = req.params
      const rta = await  service.findByUserId(id)
      res.json(rta)
    }catch(error){
      next(error)
    }
  }
);
router.get(
  "/service/:id",
  validatorHandler(findRateByUserSchema, "params"),
  async (req, res, next) => {
    try{
      const {id} = req.params
      const rta = await service.findByServiceId(id)
      res.json(rta)
    }catch(error){
      next(error)
    }
  }
)

export default router;
