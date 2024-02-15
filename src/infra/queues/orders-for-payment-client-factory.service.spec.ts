import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { instance, mock, when } from 'ts-mockito';
import { OrdersForPaymentClientFactory } from './orders-for-payment-client-factory.service';

describe('OrdersForPaymentClientFactory', () => {
  let factory: OrdersForPaymentClientFactory;
  let configService: ConfigService;

  beforeEach(async () => {
    process.env.QUEUE_USER = 'user';
    process.env.QUEUE_PASSWORD = 'password';
    process.env.QUEUE_HOST = 'localhost';
    process.env.QUEUE_PORT = '5672';

    configService = mock(ConfigService);
    when(configService.get('QUEUE_USER')).thenReturn(process.env.QUEUE_USER);
    when(configService.get('QUEUE_PASSWORD')).thenReturn(
      process.env.QUEUE_PASSWORD,
    );
    when(configService.get('QUEUE_HOST')).thenReturn(process.env.QUEUE_HOST);
    when(configService.get('QUEUE_PORT')).thenReturn(
      parseInt(process.env.QUEUE_PORT),
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersForPaymentClientFactory,
        { provide: ConfigService, useValue: instance(configService) },
      ],
    }).compile();

    factory = module.get<OrdersForPaymentClientFactory>(
      OrdersForPaymentClientFactory,
    );
  });

  it('should be defined', () => {
    expect(factory).toBeDefined();
  });

  describe('createClientOptions', () => {
    it('should create client options', async () => {
      const result = await factory.createModuleConfig();

      expect(result).toEqual({
        name: 'RabbitMQ Server',
        uri: `amqp://${process.env.QUEUE_USER}:${process.env.QUEUE_PASSWORD}@${process.env.QUEUE_HOST}:${process.env.QUEUE_PORT}`,
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
        ],
      });
    });
  });

  afterEach(() => {
    delete process.env.QUEUE_USER;
    delete process.env.QUEUE_PASSWORD;
    delete process.env.QUEUE_HOST;
    delete process.env.QUEUE_PORT;
  });
});
