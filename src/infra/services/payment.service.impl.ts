import { Inject, Injectable, Logger } from '@nestjs/common';
import { PaymentService } from '../../domain/services/payment.service';
import { Pedido } from '../../domain/model/pedido';
import { PedidoPresenter } from '../apis/rest/presenters/pedido.presenter';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentServiceImpl implements PaymentService {
  private readonly logger = new Logger(PaymentServiceImpl.name);
  constructor(
    @Inject('ORDERS_FOR_PAYMENT_QUEUE_CLIENT')
    private readonly ordersForPaymentQueueClient: ClientProxy,
  ) {}

  async sendOrderToPayment(pedido: Pedido): Promise<void> {
    this.logger.log(
      `[Sender] Enviando pedido com Id [${pedido.id}] para a fila de pagamentos`,
    );
    this.ordersForPaymentQueueClient.emit(
      'order_created',
      new PedidoPresenter(pedido),
    );
  }
}
