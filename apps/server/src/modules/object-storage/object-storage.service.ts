import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { ReadStream } from 'fs';
import { Region, SimpleAuthenticationDetailsProvider } from 'oci-common';
import { ObjectStorageClient } from 'oci-objectstorage';
import { PutObjectRequest } from 'oci-objectstorage/lib/request';
import { Repository } from 'typeorm';

import { ObjectStorage } from './entity/objectStorage.entity';

@Injectable()
export class ObjectStorageService {
  private logger = new Logger(ObjectStorageService.name);
  private oracleAuthProvider: SimpleAuthenticationDetailsProvider;
  private oracleObjectStorageClient: ObjectStorageClient;

  constructor(
    @InjectRepository(ObjectStorage)
    private readonly objectStorageRepository: Repository<ObjectStorage>,
    private readonly configService: ConfigService,
  ) {
    this.oracleAuthProvider = new SimpleAuthenticationDetailsProvider(
      configService.getOrThrow('OCI_TENANCY'),
      configService.getOrThrow('OCI_USER'),
      configService.getOrThrow('OCI_FINGERPRINT'),
      configService.getOrThrow('OCI_PRIVATEKEY'),
      null,
      Region.fromRegionId(configService.getOrThrow('OCI_REGION')),
    );

    this.oracleObjectStorageClient = new ObjectStorageClient({
      authenticationDetailsProvider: this.oracleAuthProvider,
    });
  }

  async save(dataStream: ReadStream, name: string, type: string) {
    const putObjectRequest: PutObjectRequest = {
      namespaceName: this.configService.getOrThrow('OCI_STORAGE_NAMESPACE'),
      bucketName: this.configService.getOrThrow('OCI_STORAGE_BUCKET'),
      objectName: name,
      contentType: type,
      putObjectBody: dataStream,
    };
    const putObjectResponse = await this.oracleObjectStorageClient.putObject(putObjectRequest);

    this.logger.debug('put finish', putObjectResponse);
  }
}
