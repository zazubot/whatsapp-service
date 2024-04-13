import { Request, Response, NextFunction } from "express";

/**
 * this method for getBanners
 */
export const verifyWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Again query all users but only fetch one offset by our random #

    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
