import mongoose from "mongoose";

const cartsCollection = "Cart";

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: mongoose.Schema.Types.Number,
      }
    ],
    default: [],
  },
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);