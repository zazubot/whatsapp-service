/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ @class                                                                       │
 * │ @constructs waMonitor                                                        │
 * │ @param {WAMonitoringService} waMonitor                                       │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { BadRequestException } from '../../exceptions';
import { Repository } from '../../repository/repository.service';
import { InstanceDto } from '../dto/instance.dto';
import { WebhookDto } from '../dto/webhook.dto';
import { WAMonitoringService } from './monitor.service';

export class WebhookService {
  constructor(
    private readonly waMonitor: WAMonitoringService,
    private readonly repository: Repository,
  ) {}

  public async create({ instanceName }: InstanceDto, data: WebhookDto) {
    try {
      const instance = this.waMonitor.waInstances.get(instanceName);
      if (!instance) {
        const i = await this.repository.instance.findUnique({
          where: { name: instanceName },
          select: {
            id: true,
            Webhook: true,
          },
        });
        if (!i) {
          throw new Error('Instance not found');
        }

        if (i?.Webhook) {
          const update = await this.repository.webhook.update({
            where: { id: i.Webhook.id },
            data: {
              url: data.url,
              enabled: data.enabled,
            },
          });
          if (data?.events) {
            update.events = data.events as any;
            await this.repository.updateWebhook(update.id, update);
          }

          return update;
        }

        return await this.repository.webhook.create({
          data: {
            url: data.url,
            enabled: data.enabled,
            events: data?.events as any,
            instanceId: i.id,
          },
        });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return await this.waMonitor.waInstances.get(instanceName).setWebhook(data as any);
  }

  public async find({ instanceName }: InstanceDto) {
    try {
      return await this.repository.webhook.findFirst({
        where: { Instance: { name: instanceName } },
      });
    } catch (error) {
      return { enabled: null, url: '' };
    }
  }
}
