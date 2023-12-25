import { Router } from "express";
import ChannelService from "../services/channel.service";

const service = new ChannelService()
const router = Router()

router.get('/', (req, res, next) => {
  try{
    const channels = service.find()
    res.json(channels)
  }catch(error){
    next(error)
  }
})
router.post('/', (req, res, next) => {
  try{
    const body = req.body
    const channel = service.create(body)
    res.json(channel)
  }catch(error){
    next(error)
  }
})
export default router
