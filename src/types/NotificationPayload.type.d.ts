export type Direction = "outbound" | "inbound";

export type TypeOfMessage =
  | "audio"
  | "button"
  | "document"
  | "text"
  | "image"
  | "order"
  | "sticker"
  | "system" // for customer number change messages
  | "unknown"
  | "video"
  | "interactive";

export type TypeOfStatus = "delivered" | "read" | "sent" | "init";

interface ErrorObject {
  code: number;
  title: string;
  message: string;
  error_data: {
    details: string;
  };
}

interface ContactObject {
  wa_id: string;
  profile: {
    name: string;
  };
}

interface MetadataObject {
  display_phone_number: string;
  WA_PHONE_NUMBER_ID: string;
}
interface StatusObject {
  id: string;
  recipient_id: string;
  status: TypeOfStatus;
  biz_opaque_callback_data: string;
  conversation: object;
  errors: ErrorObject[];
  timestamp: Date;
}

export interface MessageObject {
  from: string;
  id: string;

  // When messages type is set to text
  text: {
    body: string;
  };
  audio: {
    id: string;
    mime_type: string;
  };
  image: {
    caption: string;
    sha256: string;
    id: string;
    mime_type: string;
  };
  // When messages type is set to video,
  video: {
    caption: string;
    sha256: string;
    id: string;
    mime_type: string;
    filename: string;
  };
  // When messages type is set to sticker
  sticker?: {
    animated: string;
    sha256: string;
    id: string;
    mime_type: string;
  };

  button?: {
    payload: string;
    text: string;
  };

  context?: {
    forwarded: boolean;
    frequently_forwarded: boolean;
    from: string;
    id: string;
    referred_product: {
      catalog_id: string;
      product_retailer_id: string;
    };
  };

  document?: {
    caption: string;
    filename: string;
    sha256: string;
    mime_type: string;
    id: string;
  };

  // when a customer has interacted with your message
  interactive?: {
    type: {
      button_reply: {
        id: string;
        title: string;
      };
      list_reply: {
        id: string;
        title: string;
        description: string;
      };
    };
  };

  // When messages type is set to system, a customer has updated their phone number or profile information
  system: {
    body: string;
    identity: string;
    new_wa_id: string;
    wa_id: string;
    type: string;
    customer: string;
  };

  // An array of error objects describing the error.
  errors: ErrorObject[];
  identity: object;
  timestamp: string;
  type: TypeOfMessage;
}

interface ValueObject {
  messaging_product: string;
  metadata: MetadataObject;
  contacts: ContactObject[];
  errors: ErrorObject[];
  messages: MessageObject[];
  statuses: StatusObject[];
}

interface ChangeObject {
  value: ValueObject;
  field: string;
}

interface EntryObject {
  id: string;
  changes: ChangeObject[];
}

export class NotificationPayloadDTO {
  object: string;
  entry: EntryObject[];
}
