/**
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

export class TypebotDto {
  publicId?: string;
  typebotUrl?: string;
  enabled?: boolean;
  instanceName?: string;
}

export type TypebotActionSession = 'open' | 'closed' | 'paused';

export class TypebotUpdateSessionDto {
  sessionId: string;
  remoteJid: string;
  action: TypebotActionSession;
}
