import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";
import { createChatSchema, getChatSchema, sendMessage } from "../schemas/chat.schema";
import ChatService from "../services/chat.service";
import express, { NextFunction, Router } from "express";

const service = new ChatService();
const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", {session: true}),
  async (req:any, res, next:NextFunction) => {
    try{
      const user = req.user.sub
      const data = await service.findChatByMember(user)
      res.json(data)
    }catch(error){
      next(error)
    }
  }
)
router.get(
  "/members/:id",
  passport.authenticate("jwt", {session: true}),
  async (req:any, res, next) => {
    try{
      const {id} = req.params
      const userId = req.user.sub
      const members = await service.getMemberContact(id, userId)
      res.json(members)
    }catch(error){
      next(error)
    }
  }
)
router.post(
  "/",
  passport.authenticate("jwt", { session: true }),
  validatorHandler(createChatSchema, "body"),
  async (req:any, res, next) => {
    try {
      const {member} = req.body;
      const user = req.user.sub
      const rta = await service.create(member, user);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  "/message/:chatId",
  passport.authenticate("jwt", { session: true }),
  validatorHandler(sendMessage, "body"),
  async (req:any, res, next) => {
    try {
      const { chatId } = req.params;
      const userId = req.user.sub
      const body = req.body
      const rta = await service.sendMessage(chatId, userId, body);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  },
);
router.delete(
  "/:id",
  passport.authenticate("jwt", {session:true}),
  validatorHandler(getChatSchema, "params"),
  async (req, res, next) => {
    try{
      const {id} = req.params
      const rta = await service.deleteChat(id)
      res.json(rta)
    }catch(error){
      next(error)
    }
  }
)
export default router
