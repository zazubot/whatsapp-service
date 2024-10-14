/**
 * ┌──────────────────────────────────────────────────────────────────────────────┐
 * │                                                                              │
 * │ @function bucketExists @function createBucket                                │
 * │ @function getObjectUrl  @function uploadFile                                 │
 * │ @constant minioClient @constant BUCKET                                       │
 * ├──────────────────────────────────────────────────────────────────────────────┤
 * │ @important                                                                   │
 * │ For any future changes to the code in this file, it is recommended to        │
 * │ contain, together with the modification, the information of the developer    │
 * │ who changed it and the date of modification.                                 │
 * └──────────────────────────────────────────────────────────────────────────────┘
 */

import * as MinIo from 'minio';
import { join } from 'path';
import { Readable, Transform } from 'stream';
import { BadRequestException } from '../../exceptions';
import { Bucket, ConfigService } from '../../config/env.config';

const BUCKET = new ConfigService().get<Bucket>('S3');

interface Metadata extends MinIo.ItemBucketMetadata {
  'Content-Type': string;
  'custom-header-keyRemoteJid': string;
  'custom-header-pushName': string;
  'custom-header-messageId': string;
  'custom-header-fromMe': string;
  'custom-header-mediaType': string;
}

const minioClient = (() => {
  if (BUCKET?.ENABLE) {
    return new MinIo.Client({
      endPoint: BUCKET.ENDPOINT,
      port: BUCKET.PORT,
      useSSL: BUCKET.USE_SSL,
      accessKey: BUCKET.ACCESS_KEY,
      secretKey: BUCKET.SECRET_KEY,
    });
  }
})();

const bucketName = process.env.S3_BUCKET;

const bucketExists = async () => {
  if (minioClient) {
    try {
      const list = await minioClient.listBuckets();
      return list.find((bucket) => bucket.name === bucketName);
    } catch (error) {
      return false;
    }
  }
};

const createBucket = async () => {
  if (minioClient) {
    try {
      const exists = await bucketExists();
      if (!exists) {
        await minioClient.makeBucket(bucketName);
      }
      return true;
    } catch (error) {
      return false;
    }
  }
};

createBucket();

const uploadFile = async (
  fileName: string,
  file: Buffer | Transform | Readable,
  size: number,
  metadata: Metadata,
) => {
  if (minioClient) {
    const objectName = join('codechat_v1', fileName);
    try {
      metadata['custom-header-application'] = 'codechat-api-v1';
      const o = await minioClient.putObject(bucketName, objectName, file, size, metadata);

      await minioClient.setObjectTagging(
        bucketName,
        objectName,
        {
          mediaType: metadata['custom-header-mediaType'],
          application: metadata['custom-header-application'],
          sender: metadata['custom-header-keyRemoteJid'],
          contentType: metadata['Content-Type'],
          fromMe: metadata['custom-header-fromMe'],
        },
        { versionId: '_1""' },
      );
      return o;
    } catch (error) {
      console.log('ERROR: ', error);
      return error;
    }
  }
};

const getObjectUrl = async (fileName: string, expiry?: number) => {
  if (minioClient) {
    try {
      const objectName = join('codechat_v1', fileName);
      if (expiry) {
        return await minioClient.presignedGetObject(bucketName, objectName, expiry);
      }
      return await minioClient.presignedGetObject(bucketName, objectName);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
};

export { uploadFile, getObjectUrl, BUCKET };
