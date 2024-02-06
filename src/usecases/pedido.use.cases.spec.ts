import { PedidoRepository } from '../domain/repositories/pedido.repository';
import { Pedido } from '../domain/model/pedido';
import { NotFoundException } from '../domain/exceptions/not-found.exception';
import { ItemPedido } from '../domain/model/item-pedido';
import { PaymentService } from '../domain/services/payment.service';
import { ClientsService } from '../domain/services/clients.service';
import { Categoria } from '../domain/model/categoria';
import { Produto } from '../domain/model/produto';
import { PedidoUseCases } from './pedido.use.cases';

describe('PedidoUseCases', () => {
  let mockPedidoRepository: jest.Mocked<PedidoRepository>;
  let mockClientsService: jest.Mocked<ClientsService>;
  let mockPaymentService: jest.Mocked<PaymentService>;
  let pedidoUseCases: PedidoUseCases;

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

  const examplePedido: Pedido = new Pedido(
    1,
    1,
    '12345678901',
    [exampleItemPedido],
    200,
    new Date(),
  );

  beforeEach(() => {
    mockPedidoRepository = {
      findLastCodigo: jest.fn(),
      findByOrderId: jest.fn(),
      insert: jest.fn(),
    };

    mockClientsService = {
      existsClientByCpf: jest.fn(),
    };

    mockPaymentService = {
      sendOrderToPayment: jest.fn(),
    };

    pedidoUseCases = new PedidoUseCases(
      mockPedidoRepository,
      mockClientsService,
      mockPaymentService,
    );
  });

  it('should getNextCodigo call repository.findLastCodigo', async () => {
    mockPedidoRepository.findLastCodigo.mockResolvedValue(1);

    const result = await pedidoUseCases.getNextCodigo();

    expect(result).toBe(2);
    expect(mockPedidoRepository.findLastCodigo).toHaveBeenCalled();
  });

  it('should getNextCodigo call repository.findLastCodigo and return 1', async () => {
    mockPedidoRepository.findLastCodigo.mockResolvedValue(null);

    const result = await pedidoUseCases.getNextCodigo();

    expect(result).toBe(1);
    expect(mockPedidoRepository.findLastCodigo).toHaveBeenCalled();
  });

  it('should get pedido by order id', async () => {
    mockPedidoRepository.findByOrderId.mockResolvedValue(examplePedido);

    const result = await pedidoUseCases.getPedidoByOrderId(1);

    expect(result).toEqual(examplePedido);
    expect(mockPedidoRepository.findByOrderId).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException when getting non-existing pedido by order id', async () => {
    mockPedidoRepository.findByOrderId.mockResolvedValue(null);

    await expect(pedidoUseCases.getPedidoByOrderId(1)).rejects.toThrowError(
      NotFoundException,
    );
    expect(mockPedidoRepository.findByOrderId).toHaveBeenCalledWith(1);
  });

  it('should add pedido', async () => {
    mockClientsService.existsClientByCpf.mockResolvedValue(true);
    mockPedidoRepository.insert.mockResolvedValue(examplePedido);

    const result = await pedidoUseCases.addPedido('12345678901', [
      exampleItemPedido,
    ]);

    expect(result).toEqual(examplePedido);
    expect(mockClientsService.existsClientByCpf).toHaveBeenCalledWith(
      '12345678901',
    );
    expect(mockPedidoRepository.insert).toHaveBeenCalledWith(
      expect.any(Pedido),
    );
    expect(mockPaymentService.sendOrderToPayment).toHaveBeenCalledWith(
      examplePedido,
    );
  });

  it('should throw NotFoundException when adding pedido with non-existing client', async () => {
    mockClientsService.existsClientByCpf.mockResolvedValue(false);

    await expect(
      pedidoUseCases.addPedido('12345678901', [exampleItemPedido]),
    ).rejects.toThrowError(NotFoundException);
    expect(mockClientsService.existsClientByCpf).toHaveBeenCalledWith(
      '12345678901',
    );
    expect(mockPedidoRepository.insert).not.toHaveBeenCalled();
    expect(mockPaymentService.sendOrderToPayment).not.toHaveBeenCalled();
  });
});
