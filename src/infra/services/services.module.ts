import { Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsServiceImpl } from './clients.service.impl';
import { PaymentServiceImpl } from './payment.service.impl';
import { EnvironmentModule } from '../config/environment/environment.module';

@Module({
  imports: [HttpModule, EnvironmentModule],
  providers: [HttpClientService, ClientsServiceImpl, PaymentServiceImpl],
  exports: [HttpClientService, ClientsServiceImpl, PaymentServiceImpl],
})
export class ServicesModule {}
