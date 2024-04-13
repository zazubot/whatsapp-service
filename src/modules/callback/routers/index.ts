import express from "express";
import { verifyWebhook } from "../controllers/webhook.controller";

const webhookRouter = express.Router();
webhookRouter.get("/", verifyWebhook);

export default webhookRouter;
