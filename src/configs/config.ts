export function checkEnv() {
  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI Env!");
  }
  if (!process.env.META_VERIFY_TOKEN) {
    throw new Error("Missing META_VERIFY_TOKEN Env!");
  }
  if (!process.env.META_WA_TOKEN) {
    throw new Error("Missing META_WA_TOKEN Env!");
  }
  if (!process.env.PHONE_NUMBER_ID) {
    throw new Error("Missing PHONE_NUMBER_ID Env!");
  }
  if (!process.env.META_VERSION) {
    throw new Error("Missing META_VERSION Env!");
  }
  if (!process.env.WA_BUSINESS_ID) {
    throw new Error("Missing WA_BUSINESS_ID Env!");
  }
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY Env!");
  }
}

export const MONGO_URI = process.env.MONGO_URI as string;
export const META_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN as string;
export const META_WA_TOKEN = process.env.META_WA_TOKEN as string;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

export const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID as string;
export const META_VERSION = process.env.META_VERSION as string;
export const WA_BUSINESS_ID = process.env.WA_BUSINESS_ID as string;

// DEV or PRODUCTION
export const APP_ENV = process.env.APP_ENV ?? "PRODUCTION";
