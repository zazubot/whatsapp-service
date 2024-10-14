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

export type AuthState = { state: AuthenticationState; saveCreds: () => Promise<void> };

import {
  AuthenticationCreds,
  AuthenticationState,
  BufferJSON,
  initAuthCreds,
  proto,
  SignalDataTypeMap,
} from '@whiskeysockets/baileys';
import { Logger } from '../config/logger.config';
import { ConfigService } from '../config/env.config';
import { ProviderFiles } from '../provider/sessions';
import { isNotEmpty } from 'class-validator';

export class AuthStateProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly providerFiles: ProviderFiles,
  ) {}

  private readonly logger = new Logger(this.configService, AuthStateProvider.name);

  public async authStateProvider(instance: string): Promise<AuthState> {
    const [, error] = await this.providerFiles.create(instance);
    if (error) {
      this.logger.error([
        'Failed to create folder on file server',
        error?.message,
        error?.stack,
      ]);
      return;
    }

    const writeData = async (data: any, key: string): Promise<any> => {
      const json = JSON.stringify(data, BufferJSON.replacer);
      const [response, error] = await this.providerFiles.write(instance, key, {
        data: json,
      });
      if (error) {
        // this.logger.error([error?.message, error?.stack]);
        return;
      }
      return response;
    };

    const readData = async (key: string): Promise<any> => {
      const [response, error] = await this.providerFiles.read(instance, key);
      if (error) {
        // this.logger.error([error?.message, error?.stack]);
        return;
      }
      if (isNotEmpty(response?.data)) {
        return JSON.parse(JSON.stringify(response.data), BufferJSON.reviver);
      }
    };

    const removeData = async (key: string) => {
      const [response, error] = await this.providerFiles.delete(instance, key);
      if (error) {
        // this.logger.error([error?.message, error?.stack]);
        return;
      }

      return response;
    };

    const creds: AuthenticationCreds = (await readData('creds')) || initAuthCreds();

    return {
      state: {
        creds,
        keys: {
          get: async (type, ids: string[]) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const data: { [_: string]: SignalDataTypeMap[type] } = {};
            await Promise.all(
              ids.map(async (id) => {
                let value = await readData(`${type}-${id}`);
                if (type === 'app-state-sync-key' && value) {
                  value = proto.Message.AppStateSyncKeyData.fromObject(value);
                }

                data[id] = value;
              }),
            );

            return data;
          },
          set: async (data: any) => {
            const tasks: Promise<void>[] = [];
            for (const category in data) {
              for (const id in data[category]) {
                const value = data[category][id];
                const key = `${category}-${id}`;
                tasks.push(value ? await writeData(value, key) : await removeData(key));
              }
            }

            await Promise.all(tasks);
          },
        },
      },
      saveCreds: async () => {
        return await writeData(creds, 'creds');
      },
    };
  }
}
