/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │                                                                              │
 * │ @class S3Controller                                                          │                                                          │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import { BadRequestException } from '../../exceptions';
import { MediaDto } from '../../whatsapp/dto/media.dto';
import { getObjectUrl } from './minio.utils';
import { Repository } from '../../repository/repository.service';

export class S3Service {
  constructor(private readonly repository: Repository) {}

  public async getMedia(query?: MediaDto) {
    try {
      const media = await this.repository.media.findMany({
        where: query as never,
        select: {
          id: true,
          fileName: true,
          type: true,
          mimetype: true,
          createdAt: true,
          Message: true,
        },
      });

      if (!media || media.length === 0) {
        throw 'Media not found';
      }

      return media;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async getMediaUrl(id: string, expiry?: number) {
    const mediaId = Number.parseInt(id);
    const media = (await this.getMedia({ id: mediaId }))[0];
    const mediaUrl = await getObjectUrl(media.fileName, expiry);
    return {
      mediaUrl,
      ...media,
    };
  }
}
