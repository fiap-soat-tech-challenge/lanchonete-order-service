import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ModuleConfigFactory } from '@golevelup/nestjs-modules/lib/dynamicModules';

@Injectable()
export class QueuesClientFactory
  implements ModuleConfigFactory<RabbitMQConfig>
{
  constructor(private configService: ConfigService) {}

  _getUri() {
    const user = this.configService.get('QUEUE_USER');
    const password = this.configService.get('QUEUE_PASSWORD');
    const uri = this.configService.get('QUEUE_URI');

    if (uri) {
      const parts = uri.split('://');
      return `${parts[0]}://${user}:${password}@${parts[1]}`;
    }

    const host = this.configService.get('QUEUE_HOST');
    const port = this.configService.get('QUEUE_PORT');
    return `amqp://${user}:${password}@${host}:${port}`;
  }

  createModuleConfig(): Promise<RabbitMQConfig> | RabbitMQConfig {
    return {
      name: 'RabbitMQ Server',
      uri: this._getUri(),
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
}
