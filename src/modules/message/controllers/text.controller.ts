import { Request, Response, NextFunction } from "express";
import axiosMetaAPI from "../../../services/api.services";

export const sendTextMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { to, text } = req.body;
    if (to && text) {
      const { data } = await axiosMetaAPI.post("/messages", {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: {
          preview_url: false,
          body: text,
        },
      });
      res.send(data);
    }
  } catch (error) {
    next(error);
  }
};
