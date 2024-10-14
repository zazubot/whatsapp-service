/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │ @class                                                                       │
 * │ @constructs WebhookController                                                │
 * │ @param {WebhookService} webhookService                                       │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { InstanceDto } from '../dto/instance.dto';
import { WebhookDto } from '../dto/webhook.dto';
import { WebhookService } from '../services/webhook.service';

export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  public async createWebhook(instance: InstanceDto, data: WebhookDto) {
    return await this.webhookService.create(instance, data);
  }

  public async findWebhook(instance: InstanceDto) {
    return await this.webhookService.find(instance);
  }
}
