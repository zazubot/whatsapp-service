import { MONGO_URI, checkEnv } from "./config";
import { connectToDatabase } from "./database";

export default async function init() {
  // check enviroment vars and load it
  checkEnv();
  // connect to DB
  await connectToDatabase(MONGO_URI);
}
