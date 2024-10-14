/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ @class                                                                       │
 * │ @constructs OnWhatsAppDto                                                    │
 * │ @param {String} jid @param {Boolean} exists @param {String} name             │
 * │                                                                              │
 * │ @class WhatsAppNumberDto @class NumberDto @class Key @class ReadMessageDto   │
 * │ @class LastMessage @class ArchiveChatDto @class DeleteMessage                │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { WAPresence } from '@whiskeysockets/baileys';

export class OnWhatsAppDto {
  constructor(
    public readonly jid: string,
    public readonly exists: boolean,
    public readonly name?: string,
  ) {}
}

export class WhatsAppNumberDto {
  numbers: string[];
}

export class NumberDto {
  number: string;
}

export class UpdatePresenceDto extends NumberDto {
  presence: WAPresence;
}

class Key {
  id: string;
  fromMe: boolean;
  remoteJid: string;
}
export class ReadMessageDto {
  readMessages: Key[];
}

export class ReadMessageIdDto {
  messageId: number[];
}

class LastMessage {
  key: Key;
  messageTimestamp?: number;
}

export class ArchiveChatDto {
  lastMessage: LastMessage;
  archive: boolean;
}

export class DeleteMessage {
  id: string;
  everyOne?: 'true' | 'false';
}

export class RejectCallDto {
  callId: string;
  callFrom: string;
}
