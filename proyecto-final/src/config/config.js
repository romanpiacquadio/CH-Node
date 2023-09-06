import { config } from 'dotenv';

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`
})


export const {
  NODE_ENV,
  PORT,
  API_VERSION,
  MONGODB_CNN,
  BASE_URL,
  GITHUB_CLIENT_ID,
  GITHUB_SECRET_KEY,
  SECRET_JWT,
  PERSISTENCE
} = process.env