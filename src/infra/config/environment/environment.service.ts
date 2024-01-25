import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { rethrow } from '@nestjs/core/helpers/rethrow';

@Injectable()
export class EnvironmentService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  private getBoolean(strValue: string): boolean {
    return /^\s*(true|1)\s*$/i.test(strValue);
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DB_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DB_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DB_SCHEMA');
  }

  getDatabaseSync(): boolean {
    return this.getBoolean(this.configService.get<string>('DB_SYNCHRONIZE'));
  }

  getUseSslDatabase(): boolean {
    return this.getBoolean(this.configService.get<string>('DB_SSL'));
  }

  clientsServiceUrl(): string {
    return this.configService.get<string>('CLIENTS_SERVICE_URL');
  }

  paymentServiceUrl(): string {
    return this.configService.get<string>('PAYMENTS_SERVICE_URL');
  }
}
