import express from "express";
import { TextMessage, TemplateMessage } from "../controllers/text.controller";
import { prePareResponse } from "../controllers/openai.controller";

const messageRouter = express.Router();
messageRouter.post("/text/message", TextMessage);
messageRouter.post("/text/template", TemplateMessage);
messageRouter.post("/openai/test", prePareResponse);

export default messageRouter;
