import { Inject, Injectable, Logger } from '@nestjs/common';
import { PaymentQueueService } from '../../domain/services/payment-queue.service';
import { Pedido } from '../../domain/model/pedido';
import { PedidoPresenter } from '../apis/rest/presenters/pedido.presenter';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentQueueServiceImpl implements PaymentQueueService {
  private readonly logger = new Logger(PaymentQueueServiceImpl.name);
  constructor(
    @Inject('PAYMENT_QUEUE_CLIENT')
    private readonly paymentQueueClient: ClientProxy,
  ) {}

  async sendOrderToPaymentQueue(pedido: Pedido): Promise<void> {
    this.paymentQueueClient.emit('order_created', new PedidoPresenter(pedido));
    this.logger.log(
      `[Sender] Enviando pedido com Id [${pedido.id}] para a fila de pagamentos`,
    );
  }
}
