import OpenAI from "openai";
import { OPENAI_API_KEY } from "../configs/config";
import { KnowledgeModel } from "../models/knowledge.model";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
});

export const generateResponseFromKnowledge = async (
  content: any
): Promise<string | null | undefined> => {
  try {
    const Knowledge = await KnowledgeModel.find();
    const messages =
      Knowledge as OpenAI.Chat.Completions.ChatCompletionMessageParam[];

    messages.push({ role: "user", content });
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages,
      model: "gpt-3.5-turbo",
      max_tokens: 150,
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};
