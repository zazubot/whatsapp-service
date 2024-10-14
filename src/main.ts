/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * | @function bootstrap @param undefined                                         │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { ConfigService, HttpServer } from './config/env.config';
import { onUnexpectedError } from './config/error.config';
import { Logger } from './config/logger.config';
import { AppModule } from './app.module';
import 'express-async-errors';

const context = new Map<string, any>();

export async function bootstrap() {
  await AppModule(context);

  const configService = context.get('module:config') as ConfigService;

  const logger = new Logger(configService, 'SERVER');

  context.get('module:logger').info('INITIALIZER');
  context.set('server:logger', logger);

  const httpServer = configService.get<HttpServer>('SERVER');

  context.get('app').listen(httpServer.PORT, () => {
    logger.log('HTTP' + ' - ON: ' + httpServer.PORT);
    new Logger(configService, 'Swagger Docs').warn(
      `
        ..
        .       Swagger Docs
        . http://localhost:${httpServer.PORT}/docs
        . https://${process.env?.API_BACKEND || 'no-value'}/docs
        .. `.replace(/^ +/gm, '  '),
    );
  });

  onUnexpectedError(configService);
}

bootstrap();

process.on('SIGINT', async () => {
  context.get('module:provider').onModuleDestroy();
  context.get('module:repository').onModuleDestroy();
  context.get('module:logger').warn('APP MODULE - OFF');
  context.get('server:logger').warn('HTTP - OFF');
  process.exit(0);
});
