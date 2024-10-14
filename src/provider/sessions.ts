/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │                                                                              │
 * │ @type {AuthState}                                                            │
 * │ @function useMultiFileAuthStateRedisDb                                       │
 * │ @returns {Promise<AuthState>}                                                │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import axios, { Axios, AxiosError } from 'axios';
import { Auth, ConfigService, ProviderSession } from '../config/env.config';
import { Logger } from '../config/logger.config';
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

type ResponseSuccess = { status: number; data?: any };
type ResponseProvider = Promise<[ResponseSuccess?, Error?]>;

export class ProviderFiles {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger(this.configService, ProviderFiles.name);

  private _client: Axios;

  public get client() {
    return this._client;
  }

  private readonly config = Object.freeze(
    this.configService.get<ProviderSession>('PROVIDER'),
  );

  get isEnabled() {
    return !!this.config?.ENABLED;
  }

  public async onModuleInit() {
    if (this.config.ENABLED) {
      const url = `http://${this.config.HOST}:${this.config.PORT}`;
      const globalApiToken =
        this.configService.get<Auth>('AUTHENTICATION').GLOBAL_AUTH_TOKEN;

      try {
        const response = await axios.options(url + '/ping');
        if (response?.data != 'pong') {
          throw new Error('Offline file provider.');
        }

        await axios.post(
          `${url}/session`,
          { group: this.config.PREFIX },
          { headers: { apikey: globalApiToken } },
        );
      } catch (error) {
        this.logger.error([
          'Failed to connect to the file server',
          error?.message,
          error?.stack,
        ]);
        const pid = process.pid;
        execSync(`kill -9 ${pid}`);
      }

      this._client = axios.create({
        baseURL: `${url}/session/${this.config.PREFIX}`,
        headers: {
          apikey: globalApiToken,
        },
      });
    }
  }

  public async onModuleDestroy() {
    //
  }

  public async create(instance: string): ResponseProvider {
    try {
      const response = await this._client.post('', { instance });
      return [{ status: response.status, data: response?.data }];
    } catch (error) {
      return [, error];
    }
  }

  public async write(instance: string, key: string, data: any): ResponseProvider {
    try {
      const response = await this._client.post(`/${instance}/${key}`, data);
      return [{ status: response.status, data: response?.data }];
    } catch (error) {
      return [, error];
    }
  }

  public async read(instance: string, key: string): ResponseProvider {
    try {
      const response = await this._client.get(`/${instance}/${key}`);
      return [{ status: response.status, data: response?.data }];
    } catch (error) {
      return [, error];
    }
  }

  public async delete(instance: string, key: string): ResponseProvider {
    try {
      const response = await this._client.delete(`/${instance}/${key}`);
      return [{ status: response.status, data: response?.data }];
    } catch (error) {
      return [, error];
    }
  }

  public async allInstances(): ResponseProvider {
    try {
      const response = await this._client.get(`/list-instances`);
      return [{ status: response.status, data: response?.data as string[] }];
    } catch (error) {
      return [, error];
    }
  }

  public async removeSession(instance: string): ResponseProvider {
    try {
      const response = await this._client.delete(`/${instance}`);
      return [{ status: response.status, data: response?.data }];
    } catch (error) {
      return [, error];
    }
  }
}
