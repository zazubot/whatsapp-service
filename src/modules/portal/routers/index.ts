import express from "express";
import {
  getAllChannels,
  getChannelChat,
} from "../controller/messages.controller";

const portalRouter = express.Router();
portalRouter.get("/messages", getAllChannels);
portalRouter.get("/messages/:phone", getChannelChat);

export default portalRouter;
