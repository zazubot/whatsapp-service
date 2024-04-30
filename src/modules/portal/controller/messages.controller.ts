import { Request, Response, NextFunction } from "express";
import { MessageModel } from "../../../models/messages.model";

/**
 * this method for getAllChannels
 */
export const getAllChannels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let channelsGroup = await MessageModel.aggregate([
      {
        $group: {
          _id: { from: "$from" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.send(channelsGroup);
  } catch (error) {
    console.error(error);
    res.sendStatus(200);
  }
};

/**
 * this method for getChannelChat
 */
export const getChannelChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const phone = req.params.phone;
    let data = await MessageModel.paginate({
      query: { from: phone },
      limit: req.query.limit || 10,
      sort: { createdAt: -1 },
      page: req.query.page,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(200);
  }
};
