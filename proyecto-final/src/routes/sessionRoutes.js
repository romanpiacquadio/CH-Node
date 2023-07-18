import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/login");
    return res.send({message: "Logout Error", body: err})
  })
})

router.post(
  "/login",
  passport.authenticate('login', {failureRedirect:'/api/session/faillogin'}), 
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

export default router;