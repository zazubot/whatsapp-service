import express from "express";
import {
  getAllChannels,
  getChannelChat,
} from "../controller/messages.controller";
import {
  createKnowledge,
  deleteKnowledge,
  getAllKnowledgeData,
  updateKnowledge,
} from "../controller/knowledges.controller";

const portalRouter = express.Router();
portalRouter.get("/messages", getAllChannels);
portalRouter.get("/messages/:phone", getChannelChat);

portalRouter.get("/knowledge", getAllKnowledgeData);
portalRouter.post("/knowledge", createKnowledge);
portalRouter.put("/knowledge/:id", updateKnowledge);
portalRouter.delete("/knowledge/:id", deleteKnowledge);

export default portalRouter;
