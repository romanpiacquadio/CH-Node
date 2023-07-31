import { Router } from "express";
import passport from "passport";
import { userModel } from "../dao/models/user.schema.js";
import { isPasswordValid } from "../helpers/encrypt.js";
import { generateJWT } from "../helpers/jwt.js";
import { checkAuthJwt } from "../middlewares/auth-strategy.middleware.js";

const router = Router();

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/login");
    return res.send({message: "Logout Error", body: err})
  })
})

router.post("/login", async (req, res) => {    
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    
    if(!findUser) {
      return res.status(401).send({ message: `Invalid credentials`})
    }

    const passwordValid = isPasswordValid(password, findUser.password);
    if(!passwordValid) {
      return res.status(401).send({ message: `Invalid credentials`})
    }

    const signUser = {
      email,
      role: findUser.role,
      id: findUser._id,
    };

    const token = await generateJWT({ ...signUser });

    return res.send({ message: `Welcome ${findUser.first_name}`, token });

  } catch (error) {
    console.log(error);
  }
});

router.get("/faillogin", (req, res) => {
  res.send({error: "Failed Login"})
})

router.post(
  "/register",
  passport.authenticate('register', {failureRedirect:'/api/session/failregister'}),
  (req, res) => {
    res.redirect("/login");
  }
);

router.get("/failregister", (req, res) => {
  console.log("Failed register");
  res.send({error: "Failed"});
})

router.get("/github", passport.authenticate('github', {scope: ['user:email']}), (req, res) => {
})

router.get(
  "/github/callback", 
  passport.authenticate('github', {failureRedirect:'/api/session/login'}),
  (req, res) => {
    if(!req.user) return res.status(400).send({status: "error", error: "Invalid credentials"})
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    }
    res.redirect("/products")
  }
)

router.get("/current", checkAuthJwt('jwt'), (req, res) => {
  res.send(req.user)
})

export default router;