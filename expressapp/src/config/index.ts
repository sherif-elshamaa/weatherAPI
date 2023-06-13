import dotenv from 'dotenv'

dotenv.config()

const { PORT, NODE_ENV, SALT, PEPPER, TOKEN, MONGO_URI, MONGO_TEST, WEATHERKEY } = process.env

export default {
  port: PORT,
  database: NODE_ENV === 'dev' ? MONGO_URI : MONGO_TEST,
  salt: SALT,
  pepper: PEPPER,
  token: TOKEN,
  weatherkey: WEATHERKEY
}
