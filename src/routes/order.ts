import { Router } from "express";
import OrderService from "../services/order.service";
import validatorHandler from "../middlewares/validator.handler";
import { createOrderSchema, findOrderSchema } from "../schemas/order.schema";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.handler";

const router = Router()
const service = new OrderService()

router.get("/", passport.authenticate("jwt"), checkRoles("client", 'admin'), async (req:any, res, next) => {
  try{
    const skip = req.params.skip
    const limit = req.params.limit
    const clientId = req.user.sub
    const rta = await service.find(skip, limit, clientId)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.get("/:id", passport.authenticate("jwt"), checkRoles("client","admin"), validatorHandler(findOrderSchema, "params"), async (req, res, next) => {
  try{
    const {id} = req.params
    const rta = await service.findOne(id)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.post("/", validatorHandler(createOrderSchema, "body"), passport.authenticate("jwt"), checkRoles("user"), async (req:any, res, next) => {
  try{
    const body = req.body
    const clientId = req.user.sub
    const data = {
      ...body,
      clientId: clientId
    }
    const rta = await service.create(data)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.patch("/:id",passport.authenticate("jwt"), checkRoles("admin", "client"), async (req, res, next) => {
  try{
    const {id} = req.params
    const body = req.body
    const rta = await service.updateById(id, body)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
export default router
