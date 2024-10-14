/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │                                                                              │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { decodeTime } from 'ulid';

export const isValidUlid = (id: string) => {
  const ulidPattern = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/;

  if (!ulidPattern.test(id)) {
    return false;
  }

  try {
    decodeTime(id);
    return true;
  } catch (error) {
    return false;
  }
};
