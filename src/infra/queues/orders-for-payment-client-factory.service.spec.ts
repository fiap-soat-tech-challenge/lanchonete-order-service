import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { mock, instance, when } from 'ts-mockito';
import { OrdersForPaymentClientFactory } from './orders-for-payment-client-factory.service';

describe('OrdersForPaymentClientFactory', () => {
  const user = 'user';
  const password = 'password';
  let factory: OrdersForPaymentClientFactory;
  let configService: ConfigService;

  beforeEach(async () => {
    configService = mock(ConfigService);
    when(configService.get('QUEUE_USER')).thenReturn(user);
    when(configService.get('QUEUE_PASSWORD')).thenReturn(password);
    when(configService.get('QUEUE_HOST')).thenReturn('localhost');
    when(configService.get('QUEUE_PORT')).thenReturn(5672);

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
      const clientOptions = await factory.createClientOptions();

      expect(clientOptions).toEqual({
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${user}:${password}@localhost:5672`],
          queue: 'pedidos_para_pagamentos',
          queueOptions: {
            durable: true,
          },
        },
      });
    });
  });
});
