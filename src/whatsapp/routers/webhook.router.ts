/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ @class                                                                       │
 * │ @constructs WebhookRouter @extends RouterBroker                              │
 * │ @param {RequestHandler[]} guards                                             │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { RequestHandler, Router } from 'express';
import { instanceNameSchema, webhookSchema } from '../../validate/validate.schema';
import { InstanceDto } from '../dto/instance.dto';
import { WebhookDto } from '../dto/webhook.dto';
import { HttpStatus } from '../../app.module';
import { WebhookController } from '../controllers/webhook.controller';
import { dataValidate, routerPath } from '../../validate/router.validate';

export function WebhookRouter(
  webhookController: WebhookController,
  ...guards: RequestHandler[]
) {
  const router = Router()
    .put(routerPath('set'), ...guards, async (req, res) => {
      const response = await dataValidate<WebhookDto>({
        request: req,
        schema: webhookSchema,
        execute: (instance, data) => webhookController.createWebhook(instance, data),
      });

      res.status(HttpStatus.CREATED).json(response);
    })
    .get(routerPath('find'), ...guards, async (req, res) => {
      const response = await dataValidate<InstanceDto>({
        request: req,
        schema: instanceNameSchema,
        execute: (instance) => webhookController.findWebhook(instance),
      });

      res.status(HttpStatus.OK).json(response);
    });
  return router;
}
