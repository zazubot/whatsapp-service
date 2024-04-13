import { Request, Response, NextFunction } from "express";
import { sendOrderStatusEmail } from "../services/email.service";

/**
 * this method for getLoyalityPrograms
 * @STATUS : Done
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const testAsyncTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("sendOrderStatusEmail");
    const email = await sendOrderStatusEmail(
      "ahmedkhaled4d@gmail.com",
      "95944",
      "hhh",
      "ffff",
      "ssss"
    );

    return res.status(200).send(email);
  } catch (error) {
    next(error);
  }
};
