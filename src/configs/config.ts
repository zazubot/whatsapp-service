export function checkEnv() {
  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI Env!");
  }
}

export const MONGO_URI = process.env.MONGO_URI as string;

// DEV or PRODUCTION
export const APP_ENV = process.env.APP_ENV ?? "PRODUCTION";
