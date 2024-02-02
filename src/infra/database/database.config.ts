import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'test') {
      return {
        type: 'sqlite',
        database: ':memory:',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      };
    }

    return {
      type: 'postgres',
      useUTC: false,
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      schema: this.configService.get('DB_SCHEMA'),
      synchronize: this.boolean(this.configService.get('DB_SYNCHRONIZE')),
      entities: [__dirname + './../**/*.entity{.ts,.js}'],
      ssl: this.boolean(this.configService.get('DB_SSL')),
      extra: this.getExtra(),
    } as TypeOrmModuleOptions;
  }

  private boolean(strValue: string): boolean {
    return /^\s*(true|1)\s*$/i.test(strValue);
  }

  private getExtra(): object {
    if (this.boolean(this.configService.get('DB_SSL'))) {
      return {
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }
    return {};
  }
}
