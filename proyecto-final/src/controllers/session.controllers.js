import { userModel } from "../dao/mongo/models/user.schema.js";
import { generateJWT } from "../helpers/jwt.js";
import { isPasswordValid } from "../helpers/encrypt.js";

export const logout = async (req, res) => {
  res.cookie('token', null, { httpOnly: true, sameSite: 'strict', expires: new Date(0) });

  res.redirect("/login"); // Cambia "/login" a la URL adecuada
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
      name: findUser.first_name,
      role: findUser.role,
      id: findUser._id,
      cartId: findUser.cartId,
    };

    const token = await generateJWT({ ...signUser });
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    // Devolver el token en la respuesta
    res.redirect("/products");
    //res.send({msg: 'Login succesful', token});

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

export const githubCallback = async (req, res) => {
  if(!req.user) return res.status(400).send({status: "error", error: "Invalid credentials"})
  const user = {
    email: req.user.email,
    name: req.user.first_name,
    role: req.user.role,
    id: req.user._id,
    cartId: req.user.cartId,
  }

  const token = await generateJWT({ ...user });
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });

  res.redirect("/products")
}

export const current = (req, res) => {
  res.send(req.user)
};

