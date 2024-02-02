import { Injectable } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { PaymentService } from '../../domain/services/payment.service';
import { Pedido } from '../../domain/model/pedido';
import { PedidoPresenter } from '../apis/rest/presenters/pedido.presenter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentServiceImpl implements PaymentService {
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  async sendOrderToPayment(pedido: Pedido): Promise<void> {
    const paymentUrl = this.configService.get('PAYMENT_SERVICE_URL');
    await this.httpClientService.post(
      `${paymentUrl}/api/payments/pagamentos/novo`,
      new PedidoPresenter(pedido),
    );
  }
}
