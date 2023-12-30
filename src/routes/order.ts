import { Router } from "express";
import OrderService from "../services/order.service";
import validatorHandler from "../middlewares/validator.handler";
import { createOrderSchema, findOrderSchema } from "../schemas/order.schema";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.handler";

const router = Router()
const service = new OrderService()

router.get("/", checkRoles("client", 'admin'), passport.authenticate("jwt"), (req:any, res, next) => {
  try{
    const skip = req.params.skip
    const limit = req.params.limit
    const clientId = req.user.sub
    const rta = service.find(skip, limit, clientId)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.get("/:id", checkRoles("client","admin"), passport.authenticate("jwt"), validatorHandler(findOrderSchema, "params"), (req, res, next) => {
  try{
    const {id} = req.params
    const rta = service.findOne(id)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.post("/", checkRoles("user"), passport.authenticate("jwt"), validatorHandler(createOrderSchema, "body"), (req:any, res, next) => {
  try{
    const body = req.body
    const clientId = req.user.sub
    const data = {
      ...body,
      clientId: clientId
    }
    const rta = service.create(data)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.patch("/:id", checkRoles("admin", "client"),passport.authenticate("jwt"), (req, res, next) => {
  try{
    const {id} = req.params
    const rta = service.updateById(id)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
export default router
