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
export let Tickets;

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
    const { default: TicketMongo} = await import(
      "./mongo/tickets.mongo.js"
    );

    Products = ProductsMongo;
    Carts = CartsMongo;
    Tickets = TicketMongo;

    break;

  default:
    //TODO: Add memory persistence
    // const { default: ProductsMemory} = await import(
    //   "./memory/products.memory.js"
    // );
    // const { default: CartsMemory} = await import(
    //   "./memory/carts.memory.js"
    // );

    // Products = ProductsMemory;
    // Carts = CartsMemory;

    break;
}
