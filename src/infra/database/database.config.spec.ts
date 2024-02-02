import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.config';

describe('DatabaseConfigService', () => {
  let service: DatabaseConfig;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseConfig,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DatabaseConfig>(DatabaseConfig);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTypeOrmOptions', () => {
    it('should return test configuration for NODE_ENV=test', () => {
      process.env.NODE_ENV = 'test';

      const result = service.createTypeOrmOptions();

      expect(result.type).toEqual('sqlite');
      expect(result.database).toEqual(':memory:');
      expect(result.synchronize).toEqual(true);
    });

    it('should return production configuration for NODE_ENV=production', () => {
      process.env.NODE_ENV = 'production';

      jest
        .spyOn(service['configService'], 'get')
        .mockReturnValueOnce('production-value');

      const result = service.createTypeOrmOptions();

      expect(result.type).toEqual('postgres');
    });
  });

  describe('getExtra', () => {
    it('should return empty object if DB_SSL is falsy', () => {
      jest.spyOn(configService, 'get').mockReturnValueOnce('false');

      const result = service['getExtra']();

      expect(result).toEqual({});
    });

    it('should return ssl object with rejectUnauthorized set to false if DB_SSL is truthy', () => {
      jest.spyOn(configService, 'get').mockReturnValueOnce('true');

      const result = service['getExtra']();

      expect(result).toEqual({
        ssl: {
          rejectUnauthorized: false,
        },
      });
    });
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });
});
