/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │                                                                              │
 * │ @class                                                                       │
 * │ @constructs NotFoundException                                                │
 * │ @param {any[]} objectError                                                   │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { HttpStatus } from '../app.module';

export class NotFoundException {
  constructor(...objectError: any[]) {
    throw {
      status: HttpStatus.NOT_FOUND,
      error: 'Not Found',
      message: objectError.length > 0 ? objectError : undefined,
    };
  }
}
