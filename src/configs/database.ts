import mongoose from "mongoose";
/**
 * Connect To DB
 */
mongoose.Promise = global.Promise;
let isConnected = 0;

mongoose.set("strictQuery", false);

export const connectToDatabase = async (connString: string) => {
  try {
    if (isConnected) {
      console.log("DB: using existing database connection");
      return Promise.resolve();
    }
    const db = await mongoose.connect(connString);
    isConnected = db.connections[0].readyState;
    return db;
  } catch (err) {
    console.log("DB: error connecting to db", err);
    return Promise.reject(err);
  }
};
