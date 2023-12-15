import passport from "passport";
import validatorHandler from "../middlewares/validator.handler";
import {
  createChatSchema,
  getChatSchema,
  sendMessage,
} from "../schemas/chat.schema";
import ChatService from "../services/chat.service";
import express, { NextFunction, Router } from "express";
import { Server } from "socket.io";
import expressSocketIoSession from 'express-socket.io-session'
import { join } from "path";

const service = new ChatService();
const router = express.Router();

export default function chatRouter(server: any){
  const io = new Server(server,{
    connectionStateRecovery: {},
    cors: {
      origin: ['http://localhost:5500']
    }
  })
  io.on('connection', async (socket) => {
    const user = (await fetch('https://randomuser.me/api/').then(data => data.json()))
    const id = user.results[0].name.first
    socket.on('message', async (msg) => {
      const token = socket.handshake.auth.token
      const chatId = socket.handshake.auth.chatId
      const user = socket.handshake.auth.user
      console.log(chatId, user)
      io.emit("message", msg, id)
    })
  })
  router.get(
    "/",
    passport.authenticate("jwt", { session: true }),
    async (req: any, res, next: NextFunction) => {
      try {
        const user = req.user.sub;
        const data = await service.findChatByMember(user);
        res.json(data);
      } catch (error) {
        next(error);
      }
    }
  );
  router.get(
    "/:id",
    async (req, res, next) => {
      try{
        const {id} = req.params
        const chat = service.findChatById(id)

        res.sendFile(join(__dirname, '../index.html'))
      }catch(error){
        next(error)
      }
    }
  )
  router.get(
    "/members/:id",
    passport.authenticate("jwt", { session: true }),
    async (req: any, res, next) => {
      try {
        const { id } = req.params;
        const userId = req.user.sub;
        const members = await service.getMemberContact(id, userId);
        res.json(members);
      } catch (error) {
        next(error);
      }
    },
  );
  router.post(
    "/",
    passport.authenticate("jwt", { session: true }),
    validatorHandler(createChatSchema, "body"),
    async (req: any, res, next) => {
      try {
        const { member } = req.body;
        const user = req.user.sub;
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
    async (req: any, res, next) => {
      try {
        const { chatId } = req.params;
        const userId = req.user.sub;
        const body = req.body;
        const rta = await service.sendMessage(chatId, userId, body);
        res.status(201).json(rta);
      } catch (error) {
        next(error);
      }
    },
  );
  router.delete(
    "/:id",
    passport.authenticate("jwt", { session: true }),
    validatorHandler(getChatSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const rta = await service.deleteChat(id);
        res.json(rta);
      } catch (error) {
        next(error);
      }
    },
  );
  return router
}
