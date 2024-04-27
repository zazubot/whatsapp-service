import express from "express";
import { TextMessage, TemplateMessage } from "../controllers/text.controller";

const messageRouter = express.Router();
messageRouter.post("/text/message", TextMessage);
messageRouter.post("/text/template", TemplateMessage);

export default messageRouter;
