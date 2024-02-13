import { Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsServiceImpl } from './clients.service.impl';
import { PaymentQueueServiceImpl } from './payment-queue.service.impl';

@Module({
  imports: [HttpModule],
  providers: [HttpClientService, ClientsServiceImpl, PaymentQueueServiceImpl],
  exports: [HttpClientService, ClientsServiceImpl, PaymentQueueServiceImpl],
})
export class ServicesModule {}
