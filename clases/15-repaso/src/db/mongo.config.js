const { connect } = require('mongoose');

const { DB_HOST, DB_PORT, DB_NAME , DB_CNN } = require('../config/config');

const configConnection = {
  url: DB_CNN ?? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
}

console.log({configConnection})


const mongoDBConnection = async () => {
  try {
    await connect(configConnection.url, configConnection.options);
    console.log(`======================================`);
    console.log(`==== URL: ${configConnection.url.substring(0, 20)} ====`);
    console.log(`======================================`);
  } catch (error) {
    console.log("file: mongo.config.js:9 ~ mongoDBConnection ~ err:", error);
  }
}

module.exports = {
  mongoDBConnection
}