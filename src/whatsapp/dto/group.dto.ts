/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │                                                                              │
 * │ @class CreateGroupDto @class GroupPictureDto @class GroupJid                 │
 * │ @class GroupUpdateParticipantDto                                             │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

export class CreateGroupDto {
  subject: string;
  description?: string;
  participants: string[];
}

export class GroupPictureDto {
  groupJid: string;
  image: string;
}

export class GroupJid {
  groupJid: string;
}

export class GroupUpdateParticipantDto extends GroupJid {
  action: 'add' | 'remove' | 'promote' | 'demote';
  participants: string[];
}
