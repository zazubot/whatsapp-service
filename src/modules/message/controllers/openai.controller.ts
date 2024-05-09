import { Request, Response, NextFunction } from "express";
import { generateResponseFromKnowledge } from "../../../services/openai.services";

export const prePareResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text } = req.body;
  try {
    const reply = await generateResponseFromKnowledge(text);
    res.send(reply);
  } catch (error) {
    next(error);
  }
};
