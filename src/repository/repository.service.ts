/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐                                                                 │
 * │ @class Repository                                                            │
 * │ @type {ITypebotModel}                                                        │
 * │ @type {CreateLogs}                                                           │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

export class Query<T> {
  where?: T;
  sort?: 'asc' | 'desc';
  page?: number;
  offset?: number;
}

import { Prisma, PrismaClient, Webhook } from '@prisma/client';
import { WebhookEvents } from '../whatsapp/dto/webhook.dto';
import { BadRequestException, NotFoundException } from '../exceptions';
import { Logger } from '../config/logger.config';
import { ConfigService, Database } from '../config/env.config';

type CreateLogs = {
  context: string;
  description?: string;
  type: 'error' | 'info' | 'warning' | 'log';
  content: any;
};

export class Repository extends PrismaClient {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  private readonly logger = new Logger(this.configService, Repository.name);

  public async onModuleInit() {
    await this.$connect();
    this.logger.info('Repository:Connected - ON');
  }

  public async onModuleDestroy() {
    await this.$disconnect();
    this.logger.warn('Repository:Prisma - OFF');
  }

  public async updateWebhook(
    webhookId: number,
    data: Partial<Webhook> & { events?: WebhookEvents },
  ) {
    const find = await this.webhook.findUnique({
      where: {
        id: webhookId,
      },
    });
    if (!find) {
      throw new NotFoundException(['Webhook not found', `Webhook id: ${webhookId}`]);
    }
    try {
      for await (const [key, value] of Object.entries(data?.events)) {
        if (value === undefined) {
          continue;
        }

        if (!find?.events) {
          break;
        }

        const k = `ARRAY['${key}']`;
        const v = `to_jsonb(${value}::boolean)`;

        await this.$queryRaw(
          Prisma.sql`UPDATE "Webhook" SET events = jsonb_set(events, ${Prisma.raw(
            k,
          )}, ${Prisma.raw(v)}) WHERE id = ${webhookId}`,
        );
      }

      const updated = await this.webhook.update({
        where: {
          id: webhookId,
        },
        data: {
          url: data?.url,
          enabled: data?.enabled,
          events: !find?.events ? data?.events : undefined,
        },
        select: {
          id: true,
          url: true,
          enabled: true,
          events: true,
          instanceId: true,
        },
      });

      return updated;
    } catch (error) {
      throw new BadRequestException([error?.message, error?.stack]);
    }
  }

  public async createLogs(instance: string, logs: CreateLogs) {
    if (!this.configService.get<Database>('DATABASE').DB_OPTIONS?.LOGS) {
      return;
    }
    return await this.activityLogs.create({
      data: {
        ...logs,
        Instance: {
          connect: {
            name: instance,
          },
        },
      },
    });
  }
}
