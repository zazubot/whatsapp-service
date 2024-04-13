import express from "express";
import { verifyWebhook } from "../controllers/webhook.controller";
import { verifyMETAToken } from "../../../middleware/extractToken.middleware";

const webhookRouter = express.Router();
// authRouter.use(); // protect all routes
webhookRouter.get("/", verifyMETAToken, verifyWebhook);

export default webhookRouter;
