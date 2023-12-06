import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';
import { Region } from 'oci-common';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: process.env.NODE_ENV !== 'production' ? '.env' : '.env.production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
        PORT: Joi.number().default(3001),
        COOKIE_DOMAIN: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
        // YOUTUBE_API_KEY: Joi.string().required(),
        // YOUTUBE_MUSIC_AUTHORIZATION: Joi.string().required(),
        // YOUTUBE_MUSIC_COOKIE: Joi.string().required(),
        // YOUTUBE_TEMP_DIR: Joi.string().default(path.resolve('./temp')),
        OCI_STORAGE_NAMESPACE: Joi.string().required(),
        OCI_STORAGE_PUBLIC_BUCKET: Joi.string().required(),
        OCI_STORAGE_PRIVATE_BUCKET: Joi.string().required(),
        OCI_TENANCY: Joi.string().required(),
        OCI_USER: Joi.string().required(),
        OCI_FINGERPRINT: Joi.string().required(),
        OCI_PRIVATEKEY: Joi.string()
          .required()
          .custom((value) => {
            const t = (value as string).replace(/\\n/g, '\n');
            console.log('DEBUG::', t);
            return t;
          }),
        OCI_REGION: Joi.string()
          .required()
          .custom((value, helpers) => {
            if (Region.fromRegionId(value) === undefined)
              return helpers.message({ custom: 'Region Code is wrong' });
            return value;
          }),
      }),
    }),
  ],
})
export class ConfigurationModule {}
