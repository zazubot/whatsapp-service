/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ @function onUnexpectedError                                                  │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { ConfigService } from './env.config';
import { Logger } from './logger.config';

export function onUnexpectedError(configService: ConfigService) {
  const logger = new Logger(configService);
  process.on('uncaughtException', (error, origin) => {
    logger.setContext('uncaughtException');
    logger.error({
      origin,
      stderr: process.stderr.fd,
      error,
    });
  });

  process.on('unhandledRejection', (error, origin) => {
    logger.setContext('unhandledRejection');
    logger.error({
      origin,
      stderr: process.stderr.fd,
      error,
    });
  });
}
