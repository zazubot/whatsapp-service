/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ @constant eventEmitter                                                       │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import EventEmitter2 from 'eventemitter2';

export const eventEmitter = new EventEmitter2({
  delimiter: '.',
  newListener: false,
  ignoreErrors: false,
});
