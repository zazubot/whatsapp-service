/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │                                                                              │
 * │ @class S3Router                                                              │                                                          │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { RequestHandler, Router } from 'express';
import { MediaDto } from '../../whatsapp/dto/media.dto';
import { s3MediaSchema, s3MediaUrlSchema } from '../../validate/validate.schema';
import { HttpStatus } from '../../app.module';
import { routerPath, dataValidate } from '../../validate/router.validate';
import { S3Service } from './s3.service';

export function S3Router(s3Service: S3Service, ...guards: RequestHandler[]) {
  const router = Router()
    .post(routerPath('findMedia'), ...guards, async (req, res) => {
      const response = dataValidate<MediaDto>({
        request: req,
        schema: s3MediaSchema,
        execute: (_, data) => s3Service.getMedia(data),
      });

      return res.status(HttpStatus.OK).json(response);
    })
    .get(routerPath('media/url/:id'), ...guards, async (req, res) => {
      req.body = req.params;
      const response = await dataValidate<MediaDto>({
        request: req,
        schema: s3MediaUrlSchema,
        execute: (_, data) => s3Service.getMediaUrl(data.id as string, data.expiry),
      });

      return res.status(HttpStatus.OK).json(response);
    });

  return router;
}
