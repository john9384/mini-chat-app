import dotenv from "dotenv"

const envFound = dotenv.config({ path: ".env" })

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

const config = {
  appName: process.env.APP_NAME,
  port: process.env.PORT,
  db: {
    mongoUrl: process.env.MONGODB_URL,
  },
  frontend: {
    url: process.env.FRONTEND_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
}

export default config
