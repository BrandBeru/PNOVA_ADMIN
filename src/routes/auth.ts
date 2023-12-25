import passport from "passport";
import AuthService from "../services/auth.service";
import express from "express";
import UserService from "../services/user.service";

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
export default router;
