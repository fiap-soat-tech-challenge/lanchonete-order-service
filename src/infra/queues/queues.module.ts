import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PaymentQueueFactory } from './payment-queue.factory';

@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'PAYMENT_QUEUE_CLIENT',
          useClass: PaymentQueueFactory,
        },
      ],
    }),
  ],
  exports: [ClientsModule],
})
export class QueuesModule {}
