import mongoose from "mongoose";
import { createHashValue } from "../../../helpers/encrypt.js";

const userCollection = "User";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashedPassword = await createHashValue(this.password);
      this.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

export const userModel = mongoose.model(userCollection, userSchema);
