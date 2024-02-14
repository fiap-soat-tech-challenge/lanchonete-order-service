import {
  ClientProvider,
  ClientsModuleOptionsFactory,
} from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersForPaymentClientFactory
  implements ClientsModuleOptionsFactory
{
  constructor(private configService: ConfigService) {}

  createClientOptions(): Promise<ClientProvider> | ClientProvider {
    const user = this.configService.get('QUEUE_USER');
    const password = this.configService.get('QUEUE_PASSWORD');
    const host = this.configService.get('QUEUE_HOST');
    const port = this.configService.get('QUEUE_PORT');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}:${port}`],
        queue: 'pedidos_para_pagamento',
        queueOptions: {
          durable: true,
        },
      },
    };
  }
}
