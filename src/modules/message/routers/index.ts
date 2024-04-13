import express from "express";
import { sendTextMessage } from "../controllers/text.controller";

const messageRouter = express.Router();
messageRouter.post("/text", sendTextMessage);

export default messageRouter;
