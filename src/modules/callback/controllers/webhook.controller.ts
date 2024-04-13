import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../../utils/error";

/**
 * this method for getBanners
 */
export const verifyWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      req.query["hub.mode"] &&
      req.query["hub.verify_token"] === "xHi992hJeX" &&
      req.query["hub.challenge"]
    ) {
      return res.send("ok");
    } else {
      throw new UnauthorizedError("verify META Token", res);
    }
  } catch (error) {
    next(error);
  }
};
