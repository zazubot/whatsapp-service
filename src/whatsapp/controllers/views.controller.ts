/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │                                                                              │
 * │ @class                                                                       │
 * │ @constructs ViewsController                                                  │
 * │ @param {WAMonitoringService} waMonit                                         │
 * │ @param {ConfigService} configService                                         │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { Request, Response } from 'express';
import { BadRequestException } from '../../exceptions';
import { InstanceDto } from '../dto/instance.dto';
import { WAMonitoringService } from '../services/monitor.service';
import { Repository } from '../../repository/repository.service';
import { Auth } from '@prisma/client';
import { HttpStatus } from '../../app.module';

export class ViewsController {
  constructor(
    private readonly waMonit: WAMonitoringService,
    private readonly repository: Repository,
  ) {}

  public async qrcode(request: Request, response: Response) {
    try {
      const param = request.params as unknown as InstanceDto;
      const instance = this.waMonit.waInstances[param.instanceName];
      if (instance?.connectionStatus.state === 'open') {
        throw new BadRequestException('The instance is already connected');
      }

      let auth: Auth;

      if (!request?.session?.[param.instanceName]) {
        auth = await this.repository.auth.findFirst({
          where: { Instance: { name: param.instanceName } },
        });
      } else {
        auth = JSON.parse(
          Buffer.from(request.session[param.instanceName], 'base64').toString('utf8'),
        ) as Auth;
      }

      return response.status(HttpStatus.OK).render('qrcode', {
        ...param,
        auth,
        connectionState: instance?.connectionStatus.state || 'close',
      });
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }
}
