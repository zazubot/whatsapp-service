import express from "express";
import { verifyWebhook } from "../controllers/webhook.controller";
import { saveWebhookCallback } from "../controllers/callback.controller";

const webhookRouter = express.Router();
webhookRouter.get("/", verifyWebhook);
webhookRouter.post("/", saveWebhookCallback);

export default webhookRouter;
