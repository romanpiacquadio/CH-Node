import { connect } from "mongoose";
import { PERSISTENCE, MONGODB_CNN } from "../config/config.js";

const configConnection = {
  url: MONGODB_CNN,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
}

export let Products;
export let Carts;

switch (PERSISTENCE) {
  case 'MONGO':
    console.log('Persistence: ', PERSISTENCE);
    
    const connection = await connect(configConnection.url, configConnection.options)
    console.log('Connected!')
    
    const { default: ProductsMongo} = await import(
      "./mongo/products.mongo.js"
    );
    const { default: CartsMongo} = await import(
      "./mongo/carts.mongo.js"
    );

    Products = ProductsMongo;
    Carts = CartsMongo;

    break;

  default:
    //TODO: Add memory persistence
    break;
}
