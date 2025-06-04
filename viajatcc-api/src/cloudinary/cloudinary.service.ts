/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService implements OnModuleInit {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private config: ConfigService) {}
  onModuleInit() {
    const cloudName = this.config.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.config.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.config.get<string>('CLOUDINARY_API_SECRET');

    this.logger.log(`🕵️‍♂️ Cloudinary Credentials:`);
    this.logger.log(`   CLOUDINARY_CLOUD_NAME: ${cloudName ?? 'undefined'}`);
    this.logger.log(
      `   CLOUDINARY_API_KEY:    ${apiKey ? '✓ presente' : '❌ missing'}`,
    );
    this.logger.log(
      `   CLOUDINARY_API_SECRET: ${apiSecret ? '✓ presente' : '❌ missing'}`,
    );

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error(
        '[CloudinaryService] Credenciais do Cloudinary não foram encontradas. ' +
          'Verifique se você definiu CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET corretamente.',
      );
    }

    const now = new Date();
    const isoString = now.toISOString();
    const timestampSecs = Math.floor(now.getTime() / 1000);
    this.logger.log(`⏰ Container time (ISO): ${isoString}`);
    this.logger.log(`⏰ Container timestamp (secs): ${timestampSecs}`);

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    this.logger.log(
      '✅ CloudinaryService inicializado e configurado com sucesso!',
    );
  }

  async uploadImage(filePath: string): Promise<string> {
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'trips',
      use_filename: true,
      unique_filename: false,
    });
    return res.secure_url;
  }
  async uploadImageBuffer(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'trips',
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result.secure_url);
        },
      );
      const readable = new Readable();
      readable._read = () => {};
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }
}
