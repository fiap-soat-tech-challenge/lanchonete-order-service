import { Test, TestingModule } from '@nestjs/testing';
import { Pedido } from '../../domain/model/pedido';
import { PedidoPresenter } from '../apis/rest/presenters/pedido.presenter';
import { ItemPedido } from '../../domain/model/item-pedido';
import { Produto } from '../../domain/model/produto';
import { Categoria } from '../../domain/model/categoria';
import { PaymentServiceImpl } from './payment.service.impl';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

class MockAmqpConnection {
  async publish(
    exchange: string,
    routingKey: string,
    data: any,
  ): Promise<void> {
    console.log(exchange, routingKey, data);
  }
}

describe('PaymentServiceImpl', () => {
  let service: PaymentServiceImpl;
  let amqpConnection: AmqpConnection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentServiceImpl,
        { provide: AmqpConnection, useClass: MockAmqpConnection },
      ],
    }).compile();

    service = module.get<PaymentServiceImpl>(PaymentServiceImpl);
    amqpConnection = module.get<AmqpConnection>(AmqpConnection);
  });

  const currentDate = new Date();
  const exampleItemPedido: ItemPedido = new ItemPedido(
    1,
    new Produto(
      1,
      'Example Produto',
      'Description of the product',
      100,
      new Date(),
      Categoria.LANCHE,
    ),
    2,
    200,
  );
  const examplePedido = new Pedido(
    1,
    1,
    '12345678901',
    [exampleItemPedido],
    200,
    currentDate,
  );

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendOrderToPayment', () => {
    it('should send order to payment queue', async () => {
      const publishSpy = jest.spyOn(amqpConnection, 'publish');

      await service.sendOrderToPayment(examplePedido);

      expect(publishSpy).toHaveBeenCalledWith(
        'pedidos_para_pagamento',
        '',
        new PedidoPresenter(examplePedido),
      );
    });
  });
});
