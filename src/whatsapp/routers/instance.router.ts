/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ @class                                                                       │
 * │ @constructs InstanceRouter @extends RouterBroker                             │
 * │ @param {RequestHandler[]} guards                                             │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { RequestHandler, Router } from 'express';
import { instanceNameSchema, oldTokenSchema } from '../../validate/validate.schema';
import { InstanceDto } from '../dto/instance.dto';
import { OldToken } from '../services/instance.service';
import { HttpStatus } from '../../app.module';
import { InstanceController } from '../controllers/instance.controller';
import { dataValidate, routerPath } from '../../validate/router.validate';

export function InstanceRouter(
  instanceController: InstanceController,
  ...guards: RequestHandler[]
) {
  const router = Router()
    .post('/create', ...guards, async (req, res) => {
      const response = await dataValidate<InstanceDto>({
        request: req,
        schema: instanceNameSchema,
        execute: (instance) => instanceController.createInstance(instance, req),
      });

      return res.status(HttpStatus.CREATED).json(response);
    })
    .get(routerPath('connect'), ...guards, async (req, res) => {
      const response = await dataValidate<InstanceDto>({
        request: req,
        schema: instanceNameSchema,
        execute: (instance) => instanceController.connectToWhatsapp(instance),
      });

      return res.status(HttpStatus.OK).json(response);
    })
    .get(routerPath('connectionState'), ...guards, async (req, res) => {
      const response = await dataValidate<InstanceDto>({
        request: req,
        schema: instanceNameSchema,
        execute: (instance) => instanceController.connectionState(instance),
      });

      return res.status(HttpStatus.OK).json(response);
    })
    .get(routerPath('fetchInstance'), ...guards, async (req, res) => {
      const response = await dataValidate<InstanceDto>({
        request: req,
        schema: null,
        execute: (instance) => instanceController.fetchInstance(instance),
      });

      return res.status(HttpStatus.OK).json(response);
    })
    .get(routerPath('fetchInstances', false), ...guards, async (req, res) => {
      const response = await dataValidate<InstanceDto>({
        request: req,
        schema: null,
        execute: (instance) => instanceController.fetchInstances(instance),
      });

      return res.status(HttpStatus.OK).json(response);
    })
    .patch(routerPath('reload'), ...guards, async (req, res) => {
      const response = await dataValidate<InstanceDto>({
        request: req,
        schema: instanceNameSchema,
        execute: (instance) => instanceController.reloadConnection(instance),
      });

      return res.status(HttpStatus.OK).json(response);
    })
    .patch(routerPath('update'), ...guards, async (req, res) => {
      const response = await dataValidate<InstanceDto>({
        request: req,
        schema: instanceNameSchema,
        execute: (instance) => instanceController.updateInstance(instance),
      });

      return res.status(HttpStatus.OK).json(response);
    })
    .delete(routerPath('logout'), ...guards, async (req, res) => {
      const response = await dataValidate<InstanceDto>({
        request: req,
        schema: instanceNameSchema,
        execute: (instance) => instanceController.logout(instance),
      });

      return res.status(HttpStatus.OK).json(response);
    })
    .delete(routerPath('delete'), ...guards, async (req, res) => {
      const response = await dataValidate<InstanceDto>({
        request: req,
        schema: instanceNameSchema,
        execute: (instance) =>
          instanceController.deleteInstance(instance, req?.query?.force === 'true'),
      });

      return res.status(HttpStatus.OK).json(response);
    })
    .put(routerPath('refreshToken'), async (req, res) => {
      const response = await dataValidate<OldToken>({
        request: req,
        schema: oldTokenSchema,
        execute: (instance, data) => instanceController.refreshToken(instance, data, req),
      });

      return res.status(HttpStatus.CREATED).json(response);
    });

  return router;
}
