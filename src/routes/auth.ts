import passport, { session } from "passport";
import AuthService from "../services/auth.service";
import express from "express";
import { checkRoles } from "../middlewares/auth.handler";
import validatorHandler from "../middlewares/validator.handler";
import { sendEmailSchema } from "../schemas/auth.schema";
import UserService from "../services/user.service";

const router = express.Router();
const service = new AuthService();

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
      const token = await service.createAccount(userCb)
      res.json(token)
      res.redirect('/')
    }catch(error){
      next(error)
    }
  },
);
router.get('/microsoft', passport.authenticate('microsoft', {prompt: 'select_account'}))
router.get('/microsoft/callback', passport.authenticate('microsoft', {failureRedirect: '/login'}), async (req, res, next) => {
  try{
    const userCb:any = req.user
    const token = await service.createAccount(userCb)
    res.json(token)
    res.redirect('/')
  }catch(error){
    next(error)
  }
})
router.get('/linkedin', passport.authenticate('linkedin'), async (req, res, next) => {
  try{
    const userCb:any = req.user
    //const token = await service.createAccount(userCb)
    res.json(userCb)
    res.redirect('/')
  }catch(error){
    next(error)
  }
})
router.get('/linkedin/callback', passport.authenticate('linkedin', {failureRedirect: '/login', successRedirect: '/'}))
router.post('/recovery', passport.authenticate('jwt', {session: true}), async (req:any, res, next) => {
  try {
    const id = req.user.sub
    const rta = await service.sendRecoveryPassword(id)
    res.json(rta)
  } catch (error) {
    next(error)
  }
})
router.post('/activation', passport.authenticate('jwt', {session: true}), async (req:any, res, next) => {
  try{
    const id = req.user.sub
    const rta = await service.sendEmailActivation(id);
    res.json(rta)
  }catch(error){
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
router.post('/activate', passport.authenticate('jwt', {session: true}), async (req:any, res, next) => {
  try{
    const {token} = req.body
    const rta = await service.activeAccount(token)
    res.json(rta)
  }catch(error){
    next(error);
  }
})
router.post('/send-email', validatorHandler(sendEmailSchema, 'body'), passport.authenticate('jwt', {session: true}), checkRoles('admin'), async (req, res, next) => {
  try{
    const object = {
      subject: req.body.subject,
      to: req.body.to,
      html: req.body.html
    }
    const rta = await service.emailSender(object.subject, object.html, object.to)
    res.json(rta)
  }catch(error){
    next(error)
  }
})
export default router;
