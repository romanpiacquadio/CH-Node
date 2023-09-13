import { userModel } from "../dao/mongo/models/user.schema.js";
import { generateJWT } from "../helpers/jwt.js";
import { createHashValue, isPasswordValid } from "../helpers/encrypt.js";
import { SECRET_JWT } from "../config/config.js";
import { emailRefreshPassword } from "../helpers/email.js";
import jwt from "jsonwebtoken";
import { HttpResponse } from "../middlewares/error-handler.js";

const httpResponse = new HttpResponse();

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
    req.logger.error(error);
  }
};

export const failLogin =  (req, res) => {
  res.send({error: "Failed Login"})
};

export const register = (req, res) => {
  res.redirect("/login");
};

export const failRegister = (req, res) => {
  req.logger.error("Failed register");
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    const error = new Error(`The user does not exist`);
    return httpResponse.NotFound(res, 'Unexisting User', error)
  }

  try {
    const token = await generateJWT({ id: user._id, email: user.email, first_name: user.first_name });
    emailRefreshPassword(user, token);
    return httpResponse.OK(res, 'OK', 'We have sent an email with the instructions')
  } catch (error) {
    req.logger.error("There was an error with the recovery email");
  }
}

export const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = jwt.verify(token, SECRET_JWT);
    const dbUser = await userModel.findById(user.user.id);

    if (!dbUser) {
      return httpResponse.NotFound(res, 'Unexisting User', `Could not find the user`)
    }

    // Verificar si la nueva contraseña es igual a la contraseña actual
    if (isPasswordValid(password, dbUser.password)) {
      return httpResponse.BadRequest(res, 'Password Error', 'New password cannot be the same as the current password')
    }

    const newPassword = await createHashValue(password);
    await userModel.findByIdAndUpdate(
      user.user.id,
      { password: newPassword },
      { new: true }
    );

    return httpResponse.OK(res, 'OK', 'The password has been updated');

  } catch (error) {
    console.error("Error in newPassword function:", error);
    // Redirección en caso de token no válido
    return res.redirect('/reset-password');
  }

}