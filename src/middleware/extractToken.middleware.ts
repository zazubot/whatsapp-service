import { UnauthorizedError } from "../utils/error";
import type { NextFunction, Request, Response } from "express";

export const verifyMETAToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      req.query["hub.mode"] &&
      req.query["hub.verify_token"] &&
      req.query["hub.challenge"]
    ) {
      return next();
    } else {
      throw new UnauthorizedError("Expired Jwt Token", res);
    }
  } catch (e) {}
};
