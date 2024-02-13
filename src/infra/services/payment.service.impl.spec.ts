import { Test, TestingModule } from '@nestjs/testing';
import { Pedido } from '../../domain/model/pedido';
import { PedidoPresenter } from '../apis/rest/presenters/pedido.presenter';
import { ClientProxy } from '@nestjs/microservices';
import { ItemPedido } from '../../domain/model/item-pedido';
import { Produto } from '../../domain/model/produto';
import { Categoria } from '../../domain/model/categoria';
import { PaymentServiceImpl } from './payment.service.impl';

class MockClientProxy {
  emit(pattern: string, data: any): void {
    console.log(pattern, data);
  }
}

describe('PaymentServiceImpl', () => {
  let service: PaymentServiceImpl;
  let clientProxy: ClientProxy;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentServiceImpl,
        {
          provide: 'ORDERS_FOR_PAYMENT_QUEUE_CLIENT',
          useClass: MockClientProxy,
        },
      ],
    }).compile();

    service = module.get<PaymentServiceImpl>(PaymentServiceImpl);
    clientProxy = module.get<ClientProxy>('ORDERS_FOR_PAYMENT_QUEUE_CLIENT');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendOrderToPayment', () => {
    it('should send order to payment queue', async () => {
      const emitSpy = jest.spyOn(clientProxy, 'emit');

      await service.sendOrderToPayment(examplePedido);

      expect(emitSpy).toHaveBeenCalledWith(
        'order_created',
        new PedidoPresenter(examplePedido),
      );
    });
  });
});
