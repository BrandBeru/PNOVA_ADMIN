import passport from "passport";
import AuthService from "../services/auth.service";
import express from "express";
import validatorHandler from "../middlewares/validator.handler";
import { loginUserSchema } from "../schemas/auth.schema";

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
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res, next) => {
    res.redirect("/");
  },
);
export default router;
