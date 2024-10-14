/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ limitations under the License.                                               │
 * │                                                                              │
 * │ @constant ROOT_DIR @constant INSTANCE_DIR                                    │
 * │ @constant SRC_DIR  @constant AUTH_DIR                                        │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { join } from 'path';

export const ROOT_DIR = process.cwd();
export const INSTANCE_DIR = join(ROOT_DIR, 'instances');
export const SRC_DIR = join(ROOT_DIR, 'src');
export const AUTH_DIR = join(ROOT_DIR, 'store', 'auth');
export const TYPEBOT_DIR = join(ROOT_DIR, 'store', 'typebot');
