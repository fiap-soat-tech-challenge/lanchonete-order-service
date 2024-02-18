import { Module } from '@nestjs/common';
import { QueuesClientFactory } from './queues-client.factory';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: QueuesClientFactory,
    }),
    QueuesModule,
  ],
  exports: [RabbitMQModule],
})
export class QueuesModule {}
