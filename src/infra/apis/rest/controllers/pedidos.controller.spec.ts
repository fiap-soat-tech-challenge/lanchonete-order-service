import { Test, TestingModule } from '@nestjs/testing';
import { PedidosController } from './pedidos.controller';
import { PedidoUseCases } from '../../../../usecases/pedido.use.cases';
import { ProdutosUseCases } from '../../../../usecases/produtos.use.cases';
import { PedidoDto } from '../dtos/pedido.dto';
import { PedidoPresenter } from '../presenters/pedido.presenter';
import { Produto } from '../../../../domain/model/produto';
import { ItemPedido } from '../../../../domain/model/item-pedido';
import { Pedido } from '../../../../domain/model/pedido';
import { Categoria } from '../../../../domain/model/categoria';

jest.mock('../../../../usecases/pedido.use.cases');
jest.mock('../../../../usecases/produtos.use.cases');

describe('PedidosController', () => {
  const currentDate = new Date();
  const itemPedido: ItemPedido = new ItemPedido(
    1,
    new Produto(
      1,
      'Example Produto',
      'Description of the product',
      100,
      currentDate,
      Categoria.LANCHE,
    ),
    2,
    200,
  );

  let pedidosController: PedidosController;
  let pedidoUseCases: PedidoUseCases;
  let produtosUseCases: ProdutosUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [PedidoUseCases, ProdutosUseCases],
    }).compile();

    pedidosController = module.get<PedidosController>(PedidosController);
    pedidoUseCases = module.get<PedidoUseCases>(PedidoUseCases);
    produtosUseCases = module.get<ProdutosUseCases>(ProdutosUseCases);
  });

  it('should be defined', () => {
    expect(pedidosController).toBeDefined();
  });

  describe('view', () => {
    it('should view pedido by pedidoId', async () => {
      const mockPedido = new Pedido(
        1,
        1,
        '12345678901',
        [itemPedido],
        200,
        currentDate,
      );
      jest
        .spyOn(pedidoUseCases, 'getPedidoByOrderId')
        .mockResolvedValue(mockPedido);

      const result = await pedidosController.view(1);

      expect(result).toEqual(new PedidoPresenter(mockPedido));
    });
  });

  describe('incluir', () => {
    it('should add pedido successfully', async () => {
      const pedidoDto = new PedidoDto();
      pedidoDto.cpfCliente = '123.456.789-00';
      pedidoDto.itensPedido = [
        { produtoId: 1, quantidade: 2 },
        { produtoId: 2, quantidade: 1 },
      ];

      const mockProduto1 = new Produto(
        1,
        'Produto 1',
        'Descrição 1',
        100,
        new Date(),
        Categoria.LANCHE,
      );
      const mockProduto2 = new Produto(
        2,
        'Produto 2',
        'Descrição 2',
        150,
        new Date(),
        Categoria.BEBIDA,
      );

      jest
        .spyOn(produtosUseCases, 'getProdutoById')
        .mockResolvedValueOnce(mockProduto1);
      jest
        .spyOn(produtosUseCases, 'getProdutoById')
        .mockResolvedValueOnce(mockProduto2);

      const mockPedido = new Pedido(
        1,
        1,
        '12345678901',
        [itemPedido],
        200,
        currentDate,
      );

      jest.spyOn(pedidoUseCases, 'addPedido').mockResolvedValue(mockPedido);

      const result = await pedidosController.incluir(pedidoDto);

      expect(result).toEqual(new PedidoPresenter(mockPedido));
    });
  });
});
