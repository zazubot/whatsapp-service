import mongoose, { Schema } from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export type Knowledge = mongoose.Document & {
  content: any;
  role: string;
};

const KnowledgeSchema = new Schema(
  {
    content: String,
    role: {
      type: String,
      default: "system",
    },
  },
  { timestamps: true }
);

KnowledgeSchema.plugin(mongoosePagination);
export const KnowledgeModel: Pagination<Knowledge> = mongoose.model<
  Knowledge,
  Pagination<Knowledge>
>("Knowledge", KnowledgeSchema);
