import { connect } from "mongoose";
import { MONGODB_CNN } from "../config/config.js";

const configConnection = {
  url: MONGODB_CNN,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
}

export const mongoDBConnection = async () => {
  try {
    await connect(configConnection.url, configConnection.options);
    console.log(`======================================`);
    console.log(`==== URL: ${configConnection.url.substring(0, 25)} ====`);
    console.log(`======================================`);
  } catch (error) {
    console.log("file: mongo.config.js:9 ~ mongoDBConnection ~ err:", error);
  }
}