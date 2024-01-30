import { Injectable } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { EnvironmentService } from '../config/environment/environment.service';
import { PaymentService } from '../../domain/services/payment.service';
import { Pedido } from '../../domain/model/pedido';
import { PedidoPresenter } from '../apis/rest/presenters/pedido.presenter';

@Injectable()
export class PaymentServiceImpl implements PaymentService {
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly envie: EnvironmentService,
  ) {}

  async sendOrderToPayment(pedido: Pedido): Promise<void> {
    await this.httpClientService.post(
      `${this.envie.paymentServiceUrl()}/api/clients/pagamentos/novo`,
      new PedidoPresenter(pedido),
    );
  }
}
