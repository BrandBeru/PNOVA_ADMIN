import { Router } from "express"
import GroupService from "../services/group.service"
import validatorHandler from "../middlewares/validator.handler"
import { createGroupSchema } from "../schemas/group.schema"

const router = Router()
const service = new GroupService()

router.post("/",
  validatorHandler(createGroupSchema,
  'body'), async (req:any, res, next) => {
  try{
    const body = req.body
    const userId = req.user.sub
    const group = await service.create(body, userId)
  }catch(error){
    next(error)
  }
})

export default router
