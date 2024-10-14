/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ @class MediaDto                                                              │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

export class MediaDto {
  id?: number | string;
  type?: string;
  messageId?: number;
  expiry?: number;
}
