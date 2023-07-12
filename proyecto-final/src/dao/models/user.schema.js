import mongoose from "mongoose";

const userCollection = "User";

const userSchema = {
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default : 'USER',
  }
}

export const userModel = mongoose.model(userCollection, userSchema);