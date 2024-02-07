import { Injectable, Logger } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { PaymentService } from '../../domain/services/payment.service';
import { Pedido } from '../../domain/model/pedido';
import { PedidoPresenter } from '../apis/rest/presenters/pedido.presenter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentServiceImpl implements PaymentService {
  private readonly logger = new Logger(PaymentServiceImpl.name);
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  /*
    Precisa de um serviço de pagamento para enviar o pedido para pagamento
   */
  async sendOrderToPayment(pedido: Pedido): Promise<void> {
    const paymentUrl = this.configService.get('PAYMENTS_SERVICE_URL');
    const url = `${paymentUrl}/api/pagamentos/novo`;

    this.logger.log(
      `[Sender] Enviando pedido com Id [${pedido.id}] para o serviço de pagamentos [${paymentUrl}]`,
    );

    await this.httpClientService.post(url, new PedidoPresenter(pedido));
  }
}
