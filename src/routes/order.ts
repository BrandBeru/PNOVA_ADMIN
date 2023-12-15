import { Router } from "express";
import OrderService from "../services/order.service";
import validatorHandler from "../middlewares/validator.handler";
import { createOrderSchema, findOrderSchema } from "../schemas/order.schema";

const router = Router()
const service = new OrderService()

router.get("/", (req:any, res, next) => {
  try{
    const skip = req.params.skip
    const limit = req.params.limit
    const rta = service.find(skip, limit)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.get("/:id", validatorHandler(findOrderSchema, "params"), (req, res, next) => {
  try{
    const {id} = req.params
    const rta = service.findOne(id)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.post("/", validatorHandler(createOrderSchema, "body"), (req, res, next) => {
  try{
    const body = req.body
    const rta = service.create(body)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.patch("/:id", (req, res, next) => {
  try{
    const {id} = req.params
    const rta = service.updateById(id)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
