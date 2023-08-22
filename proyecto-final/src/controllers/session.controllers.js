import { userModel } from "../dao/mongo/models/user.schema.js";
import { generateJWT } from "../helpers/jwt.js";
import { isPasswordValid } from "../helpers/encrypt.js";

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/login");
    return res.send({message: "Logout Error", body: err})
  })
}

export const login = async (req, res) => {    
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
};

export const failLogin =  (req, res) => {
  res.send({error: "Failed Login"})
};

export const register = (req, res) => {
  res.redirect("/login");
};

export const failRegister = (req, res) => {
  console.log("Failed register");
  res.send({error: "Failed"});
};

export const githubCallback = (req, res) => {
  if(!req.user) return res.status(400).send({status: "error", error: "Invalid credentials"})
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email,
  }
  res.redirect("/products")
}

export const current = (req, res) => {
  res.send(req.user)
};

