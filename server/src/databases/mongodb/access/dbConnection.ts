import mongoose from "mongoose"
import config from "../../../config"

export class MongoDBConnection {
  public static async initConnection(): Promise<void> {
    await this.connect(config.db.mongoUrl || "")
  }

  public static async connect(connStr: string) {
    return mongoose
      .connect(connStr)
      .then(() =>
        console.info(`
          >>>>>>>>>>>>>>>>>>>>>>>>
            Mongo DB is Connected
          >>>>>>>>>>>>>>>>>>>>>>>>
        `)
      )
      .catch((err) => console.info(err))
  }

  public static setAutoReconnect(): void {
    mongoose.connection.on("disconnected", () =>
      this.connect(config.db.mongoUrl || "")
    )
  }

  public static async disconnect(): Promise<void> {
    await mongoose.connection.close()
  }
}
