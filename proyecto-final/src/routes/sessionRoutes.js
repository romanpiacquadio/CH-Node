import { Router } from "express";
import { userModel } from "../dao/models/user.schema.js";
import { BASE_URL } from "../config/config.js";
import axios from "axios";

const router = Router();

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/login");
    return res.send({message: "Logout Error", body: err})
  })
})

router.post("/login", async (req, res) => {
  const {email, password} = req.body
  
  try {
    const findUser = await userModel.findOne( {email});
    if (!findUser || findUser.password !== password) {
      return res.status(401).send({message: "Invalid email or password"})
    }

    req.session.user = {
      ...findUser,
      password: "",
    };

    // return await axios.get(`${BASE_URL}/products`)
    
    res.redirect("/products")

  } catch (error) {
    console.log(error);
  }
})

router.post("/register", async (req, res) => {
  try {
    const {body} = req;
    const newUser = userModel.create(body);

    req.session.user = {...newUser}
    return res.render("login")

  } catch (error) {
    console.log(error);
  }
})

export default router;