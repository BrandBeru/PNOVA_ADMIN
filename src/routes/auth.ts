import passport from "passport";
import AuthService from "../services/auth.service";
import express from "express";
import UserService from "../services/user.service";
import { checkRoles } from "../middlewares/auth.handler";
import validatorHandler from "../middlewares/validator.handler";
import { sendEmailSchema } from "../schemas/auth.schema";

const router = express.Router();
const service = new AuthService();
const userService = new UserService()

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const rta = await service.signToken(user);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);
router.get("/google", passport.authenticate("google", {scope: ['email', 'profile']}));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/v1/auth/google" }),
  async (req, res, next) => {
    try{
      const userCb:any = req.user

      const user = await userService.existUsersByEmail(userCb.email)
      if(user.length){
        const token = await service.signToken(user[0])
        res.json(token)
      }
      const rta = await userService.create(userCb)
      const token = await service.signToken(rta)
      res.json(token)

      res.redirect("/");
    }catch(error){
      next(error)
    }
  },
);
router.post('/recovery', passport.authenticate('jwt', {session: true}), async (req:any, res, next) => {
  try {
    const id = req.user.sub
    const rta = await service.sendRecoveryPassword(id)
    res.json(rta)
  } catch (error) {
    next(error)
  }
})
router.patch('/change-password', passport.authenticate('jwt', {session: true}), async (req, res, next) => {
  try{
    const {token, newPassword} = req.body
    const rta = await service.changePassword(token, newPassword)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
router.post('/send-email', validatorHandler(sendEmailSchema, 'body'), passport.authenticate('jwt', {session: true}), checkRoles('admin'), async (req, res, next) => {
  try{
    const object = {
      subject: req.body.subject,
      html: req.body.html
    }
    const rta = await service.sendEmailToClients(object.subject, object.html)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
export default router;
