const { config } = require('dotenv');

//console.log(`.env.${process.env.NODE_ENV || 'development'}.local`);

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local` // .env.development.local
})

const {
  API_VERSION,
  NODE_ENV,
  PORT,
  ORIGIN,
  DB_CNN,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASSWORD
} = process.env

console.log({NODE_ENV});


module.exports = {
  API_VERSION,
  NODE_ENV,
  PORT,
  ORIGIN,
  DB_CNN,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASSWORD 
}
