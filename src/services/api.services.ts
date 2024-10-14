import axios from "axios";
import {
  CLOUD_API_VERSION,
  CLOUD_API_ACCESS_TOKEN,
  WA_PHONE_NUMBER_ID,
} from "../configs/config";

const baseURL: string = `https://graph.facebook.com/${CLOUD_API_VERSION}/${WA_PHONE_NUMBER_ID}`;
const axiosMetaAPI = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CLOUD_API_ACCESS_TOKEN}`,
  },
});

const mediaURL: string = `https://graph.facebook.com/${CLOUD_API_VERSION}`;
const axiosMetaMediaAPI = axios.create({
  baseURL: mediaURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${CLOUD_API_ACCESS_TOKEN}`,
    "User-Agent": "node",
  },
});

export { axiosMetaAPI, axiosMetaMediaAPI };
