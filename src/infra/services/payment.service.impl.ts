import { Injectable, Logger } from '@nestjs/common';
import { PaymentService } from '../../domain/services/payment.service';
import { Pedido } from '../../domain/model/pedido';
import { PedidoPresenter } from '../apis/rest/presenters/pedido.presenter';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class PaymentServiceImpl implements PaymentService {
  private readonly logger = new Logger(PaymentServiceImpl.name);
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendOrderToPayment(pedido: Pedido): Promise<void> {
    this.logger.log(
      `[Sender] Enviando pedido com Id [${pedido.id}] para a fila de pagamentos`,
    );
    await this.amqpConnection.publish(
      'pedidos_para_pagamento',
      '',
      new PedidoPresenter(pedido),
    );
  }
}
