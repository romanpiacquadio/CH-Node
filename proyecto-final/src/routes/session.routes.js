import { Router } from "express";
import { checkAuthJwt } from "../middlewares/auth-strategy.middleware.js";
import { handlePolicies } from "../middlewares/handle-policies.middleware.js";
import passport from "passport";
import { 
  logout as logoutController,
  login as loginController,
  failLogin as failLoginController,
  register as registerController,
  failRegister as failRegisterController,
  githubCallback as githubCallbackController,
  current as currentController,
  forgotPassword as forgotPasswordController,
  newPassword as newPasswordController,
} from "../controllers/session.controllers.js";


const router = Router();

router.get("/logout", logoutController);

router.post("/login", loginController);

router.get("/faillogin", failLoginController);

router.post( "/register", passport.authenticate('register', {failureRedirect:'/api/session/failregister'}), registerController);

router.get("/failregister", failRegisterController);

router.get("/github", passport.authenticate('github', { scope: [ 'user:email' ] }), async (req, res) => {});

router.get("/github/callback", passport.authenticate('github', {failureRedirect:'/api/session/login'}), githubCallbackController);

router.get("/current", handlePolicies('jwt', ["ADMIN"]), currentController);

router.post("/forgot-password", forgotPasswordController);

router.route("/set-new-password/:token").post(newPasswordController);

export default router;

