/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │                                                                              │
 * │ @class                                                                       │
 * │ @constructs SendMessageController                                            │
 * │ @param {WAMonitoringService} waMonit                                         │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { isBase64, isNumberString, isURL } from 'class-validator';
import { BadRequestException } from '../../exceptions';
import { InstanceDto } from '../dto/instance.dto';
import {
  AudioMessageFileDto,
  MediaFileDto,
  SendAudioDto,
  SendButtonsDto,
  SendContactDto,
  SendListDto,
  SendListLegacyDto,
  SendLocationDto,
  SendMediaDto,
  SendReactionDto,
  SendTextDto,
} from '../dto/sendMessage.dto';
import { WAMonitoringService } from '../services/monitor.service';

export class SendMessageController {
  constructor(private readonly waMonitor: WAMonitoringService) {}

  public async sendText({ instanceName }: InstanceDto, data: SendTextDto) {
    return await this.waMonitor.waInstances.get(instanceName).textMessage(data);
  }

  public async sendMedia({ instanceName }: InstanceDto, data: SendMediaDto) {
    if (isBase64(data?.mediaMessage?.media)) {
      throw new BadRequestException('Owned media must be a url');
    }
    if (data?.mediaMessage.mediatype === 'document' && !data?.mediaMessage?.fileName) {
      throw new BadRequestException('Enter the file name for the "document" type.');
    }
    if (isURL(data?.mediaMessage?.media as string)) {
      return await this.waMonitor.waInstances.get(instanceName).mediaMessage(data);
    }
  }

  public async sendMediaFile(
    { instanceName }: InstanceDto,
    data: MediaFileDto,
    file: Express.Multer.File,
  ) {
    if (data?.delay && !isNumberString(data.delay)) {
      throw new BadRequestException('The "delay" property must have an integer.');
    } else {
      data.delay = Number.parseInt(data?.delay as never);
    }
    return await this.waMonitor.waInstances
      .get(instanceName)
      .mediaFileMessage(data, file);
  }

  public async sendWhatsAppAudio({ instanceName }: InstanceDto, data: SendAudioDto) {
    if (isBase64(data?.audioMessage.audio)) {
      throw new BadRequestException('Owned media must be a url');
    }
    if (!isURL(data.audioMessage.audio, { protocols: ['http', 'https'] })) {
      throw new BadRequestException('Unknown error');
    }

    return await this.waMonitor.waInstances.get(instanceName).audioWhatsapp(data);
  }

  public async sendWhatsAppAudioFile(
    { instanceName }: InstanceDto,
    data: AudioMessageFileDto,
    file: Express.Multer.File,
  ) {
    if (data?.delay && !isNumberString(data.delay)) {
      throw new BadRequestException('The "delay" property must have an integer.');
    } else {
      data.delay = Number.parseInt(data?.delay as never);
    }
    return await this.waMonitor.waInstances
      .get(instanceName)
      .audioWhatsAppFile(data, file);
  }

  public async sendLocation({ instanceName }: InstanceDto, data: SendLocationDto) {
    return await this.waMonitor.waInstances.get(instanceName).locationMessage(data);
  }

  public async sendContact({ instanceName }: InstanceDto, data: SendContactDto) {
    return await this.waMonitor.waInstances.get(instanceName).contactMessage(data);
  }

  public async sendReaction({ instanceName }: InstanceDto, data: SendReactionDto) {
    if (!data.reactionMessage.reaction.match(/[^\(\)\w\sà-ú"-\+]+/)) {
      throw new BadRequestException('"reaction" must be an emoji');
    }
    return await this.waMonitor.waInstances.get(instanceName).reactionMessage(data);
  }

  public async sendButtons({ instanceName }: InstanceDto, data: SendButtonsDto) {
    return await this.waMonitor.waInstances.get(instanceName).buttonsMessage(data);
  }

  public async sendList({ instanceName }: InstanceDto, data: SendListDto) {
    return await this.waMonitor.waInstances.get(instanceName).listButtons(data);
  }

  public async sendListLegacy({ instanceName }: InstanceDto, data: SendListLegacyDto) {
    return await this.waMonitor.waInstances.get(instanceName).listLegacy(data);
  }
}
