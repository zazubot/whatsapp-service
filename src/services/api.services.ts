import axios from "axios";
import {
  META_VERSION,
  META_WA_TOKEN,
  PHONE_NUMBER_ID,
} from "../configs/config";

const baseURL: string = `https://graph.facebook.com/${META_VERSION}/${PHONE_NUMBER_ID}`;
const axiosMetaAPI = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${META_WA_TOKEN}`,
  },
});

const mediaURL: string = `https://graph.facebook.com/${META_VERSION}`;
const axiosMetaMediaAPI = axios.create({
  baseURL: mediaURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${META_WA_TOKEN}`,
    "User-Agent": "node",
  },
});

export { axiosMetaAPI, axiosMetaMediaAPI };
