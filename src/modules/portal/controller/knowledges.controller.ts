import { Request, Response, NextFunction } from "express";
import { KnowledgeModel } from "../../../models/knowledge.model";

/**
 * this controller for updateClient
 * @STATUS : NOT Ready
 */
export const createKnowledge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = await KnowledgeModel.create(req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateKnowledge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = await KnowledgeModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).lean(true);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const deleteKnowledge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = await KnowledgeModel.findByIdAndDelete(req.params.id).lean(true);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * this controller for KnowledgeModel
 * @STATUS : Not Ready
 */
export const getAllKnowledgeData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = await KnowledgeModel.find();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
