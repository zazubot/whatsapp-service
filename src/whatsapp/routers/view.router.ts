/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ @class                                                                       │
 * │ @constructs ViewsRouter @extends RouterBroker                                │
 * │ @param {RequestHandler[]} guards                                             │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { RequestHandler, Router } from 'express';
import { ViewsController } from '../controllers/views.controller';
import { routerPath } from '../../validate/router.validate';

export function ViewsRouter(
  viewsController: ViewsController,
  ...guards: RequestHandler[]
) {
  const router = Router().get(routerPath('qrcode'), ...guards, (req, res) => {
    return viewsController.qrcode(req, res);
  });

  return router;
}
