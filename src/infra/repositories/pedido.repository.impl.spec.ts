import { PedidoRepositoryImpl } from './pedido.repository.impl';
import { PedidoEntity } from '../entities/pedido.entity';
import { Pedido } from '../../domain/model/pedido';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produto } from '../../domain/model/produto';
import { Categoria } from '../../domain/model/categoria';
import { ItemPedido } from '../../domain/model/item-pedido';
import { PedidoConverter } from '../shared/pedido.converter';

describe('PedidoRepositoryImpl', () => {
  const currentDate = new Date();
  let pedidoRepositoryImpl: PedidoRepositoryImpl;

  const mockPedidoEntityRepository = {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoRepositoryImpl,
        {
          provide: getRepositoryToken(PedidoEntity),
          useValue: mockPedidoEntityRepository,
        },
      ],
    }).compile();

    pedidoRepositoryImpl =
      module.get<PedidoRepositoryImpl>(PedidoRepositoryImpl);
  });

  const exampleProduto = new Produto(
    1,
    'Example Produto',
    'Description of the product',
    100,
    currentDate,
    Categoria.LANCHE,
  );

  const exampleItemPedido = new ItemPedido(1, exampleProduto, 2, 200);

  const examplePedido = new Pedido(
    1,
    1,
    '12345678901',
    [exampleItemPedido],
    200,
    currentDate,
  );

  it('should find pedido by order id', async () => {
    mockPedidoEntityRepository.findOneBy.mockResolvedValue(examplePedido);

    const result = await pedidoRepositoryImpl.findByOrderId(1);

    expect(result).toEqual(examplePedido);
    expect(mockPedidoEntityRepository.findOneBy).toHaveBeenCalledWith({
      id: 1,
    });
  });

  it('should return null when finding non-existing pedido by order id', async () => {
    mockPedidoEntityRepository.findOneBy.mockResolvedValue(null);

    const result = await pedidoRepositoryImpl.findByOrderId(1);

    expect(result).toBeNull();
    expect(mockPedidoEntityRepository.findOneBy).toHaveBeenCalledWith({
      id: 1,
    });
  });

  it('should find last codigo', async () => {
    const lastPedidoEntity: Partial<PedidoEntity> = {
      id: 2,
      codigoPedido: 2,
      cpfCliente: '98765432101',
      itensPedido: [],
      precoTotal: 300,
      dataHoraCadastro: new Date(),
    };

    mockPedidoEntityRepository.findOne.mockResolvedValue(lastPedidoEntity);

    const result = await pedidoRepositoryImpl.findLastCodigo();

    expect(result).toEqual(2);
    expect(mockPedidoEntityRepository.findOne).toHaveBeenCalledWith({
      where: {},
      order: { id: 'DESC' },
    });
  });

  it('should return null when finding last codigo with no existing pedidos', async () => {
    mockPedidoEntityRepository.findOne.mockResolvedValue(null);

    const result = await pedidoRepositoryImpl.findLastCodigo();

    expect(result).toBeNull();
    expect(mockPedidoEntityRepository.findOne).toHaveBeenCalledWith({
      where: {},
      order: { id: 'DESC' },
    });
  });

  it('should insert pedido', async () => {
    const pedidoEntityToInsert = PedidoConverter.toEntity(examplePedido);
    mockPedidoEntityRepository.save.mockResolvedValue(pedidoEntityToInsert);

    const result = await pedidoRepositoryImpl.insert(examplePedido);

    expect(mockPedidoEntityRepository.save).toHaveBeenCalledWith(
      pedidoEntityToInsert,
    );
    expect(result).toEqual(PedidoConverter.toPedido(pedidoEntityToInsert));
  });
});
