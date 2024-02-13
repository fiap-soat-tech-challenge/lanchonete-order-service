import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { OrdersForPaymentClientFactory } from './orders-for-payment-client-factory.service';

@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'ORDERS_FOR_PAYMENT_QUEUE_CLIENT',
          useClass: OrdersForPaymentClientFactory,
        },
      ],
    }),
  ],
  exports: [ClientsModule],
})
export class QueuesModule {}
