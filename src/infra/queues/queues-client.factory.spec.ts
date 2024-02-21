import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { instance, mock, when } from 'ts-mockito';
import { QueuesClientFactory } from './queues-client.factory';

describe('OrdersForPaymentClientFactory', () => {
  let factory: QueuesClientFactory;
  let configService: ConfigService;

  function getExpectedResult() {
    return {
      name: 'RabbitMQ Server',
      uri: `amqp://${process.env.QUEUE_USER}:${process.env.QUEUE_PASSWORD}@localhost:5672`,
      exchanges: [
        {
          name: 'pedidos_para_pagamento',
          type: 'fanout',
        },
      ],
      queues: [
        {
          name: 'pedidos_para_pagamento',
          options: {
            durable: true,
          },
          exchange: 'pedidos_para_pagamento',
          routingKey: '',
        },
        {
          name: 'delete_cliente_orders',
          options: {
            durable: true,
          },
        },
      ],
    };
  }

  beforeEach(async () => {
    configService = mock(ConfigService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueuesClientFactory,
        { provide: ConfigService, useValue: instance(configService) },
      ],
    }).compile();

    factory = module.get<QueuesClientFactory>(QueuesClientFactory);
  });

  it('should be defined', async () => {
    process.env.QUEUE_USER = 'user';
    process.env.QUEUE_PASSWORD = 'password';
    process.env.QUEUE_HOST = 'localhost';

    when(configService.get('QUEUE_USER')).thenReturn(process.env.QUEUE_USER);
    when(configService.get('QUEUE_PASSWORD')).thenReturn(
      process.env.QUEUE_PASSWORD,
    );
    when(configService.get('QUEUE_URI')).thenReturn(process.env.QUEUE_URI);

    expect(factory).toBeDefined();
  });

  describe('createClientOptions', () => {
    it('should create client options', async () => {
      process.env.QUEUE_USER = 'user';
      process.env.QUEUE_PASSWORD = 'password';
      process.env.QUEUE_URI = 'amqp://localhost:5672';

      when(configService.get('QUEUE_USER')).thenReturn(process.env.QUEUE_USER);
      when(configService.get('QUEUE_PASSWORD')).thenReturn(
        process.env.QUEUE_PASSWORD,
      );
      when(configService.get('QUEUE_URI')).thenReturn(process.env.QUEUE_URI);

      const result = await factory.createModuleConfig();

      expect(result).toEqual(getExpectedResult());
    });

    it('should create client options false', async () => {
      process.env.QUEUE_USER = 'user';
      process.env.QUEUE_PASSWORD = 'password';
      process.env.QUEUE_HOST = 'localhost';
      process.env.QUEUE_PORT = '5672';

      when(configService.get('QUEUE_USER')).thenReturn(process.env.QUEUE_USER);
      when(configService.get('QUEUE_PASSWORD')).thenReturn(
        process.env.QUEUE_PASSWORD,
      );
      when(configService.get('QUEUE_HOST')).thenReturn(process.env.QUEUE_HOST);
      when(configService.get('QUEUE_PORT')).thenReturn(
        parseInt(process.env.QUEUE_PORT),
      );

      const result = await factory.createModuleConfig();

      expect(result).toEqual(getExpectedResult());
    });
  });

  afterEach(() => {
    delete process.env.QUEUE_USER;
    delete process.env.QUEUE_PASSWORD;
    delete process.env.QUEUE_HOST;
    delete process.env.QUEUE_PORT;
  });
});
