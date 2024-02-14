import { Module } from '@nestjs/common';
import { OrdersForPaymentClientFactory } from './orders-for-payment-client-factory.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: OrdersForPaymentClientFactory,
    }),
    QueuesModule,
  ],
  exports: [RabbitMQModule],
})
export class QueuesModule {}
