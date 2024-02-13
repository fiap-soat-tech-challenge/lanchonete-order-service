import { PaymentQueueServiceImpl } from './payment-queue.service.impl';
import { HttpClientService } from './http-client.service';
import { Pedido } from '../../domain/model/pedido';
import { PedidoPresenter } from '../apis/rest/presenters/pedido.presenter';
import { ConfigService } from '@nestjs/config';
import { ItemPedido } from '../../domain/model/item-pedido';
import { Produto } from '../../domain/model/produto';
import { Categoria } from '../../domain/model/categoria';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('./http-client.service');
jest.mock('@nestjs/config');

describe('PaymentServiceImpl', () => {
  const paymentUrl = 'https://orderservice.com';
  let paymentService: PaymentQueueServiceImpl;
  let httpClientService: HttpClientService;
  let configService: ConfigService;

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
      providers: [PaymentQueueServiceImpl, HttpClientService, ConfigService],
    }).compile();

    paymentService = module.get<PaymentQueueServiceImpl>(PaymentQueueServiceImpl);
    httpClientService = module.get<HttpClientService>(HttpClientService);
    configService = module.get<ConfigService>(ConfigService);
    jest.spyOn(configService, 'get').mockReturnValue(paymentUrl);
  });

  it('should send order to payment', async () => {
    const pedidoPresenter = new PedidoPresenter(examplePedido);

    await paymentService.sendOrderToPaymentQueue(examplePedido);

    expect(configService.get).toHaveBeenCalledWith('PAYMENTS_SERVICE_URL');
    expect(httpClientService.post).toHaveBeenCalledWith(
      `${paymentUrl}/api/pagamentos/novo`,
      pedidoPresenter,
    );
  });
});
