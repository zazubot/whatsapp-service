/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

export type RichText = {
  type: string;
  text: string;
  bold: boolean;
  italic: boolean;
  children: {
    bold: boolean;
    italic: boolean;
    text: string;
    type: string;
    children: RichText[];
  }[];
};

export type Content = {
  richText: RichText[];
  url?: string;
  id?: string;
  type?: string;
  height?: number;
  aspectRatio?: string;
  maxWidth?: string;
};

export type ResponseMessage = {
  id: string;
  type: string;
  content: Content;
};

export type Input = {
  id: string;
  type: string;
  options: {
    labels: {
      placeholder: string;
    };
  };
};

export type Typebot = {
  id: string;
  theme: object;
  settings: object;
};

export type Response = {
  messages: ResponseMessage[];
  input: Input;
  sessionId: string;
  typebot: Typebot;
  resultId: string;
  code: string;
} & SessionNotFound;

export type SessionNotFound = {
  message: string;
  code: string;
};
