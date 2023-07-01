import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//console.log({url: process.env.MONGODB_CNN})

const configConnection = {
  url: process.env.MONGODB_CNN,
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