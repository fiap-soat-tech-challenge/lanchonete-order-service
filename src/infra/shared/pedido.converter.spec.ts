import { PedidoEntity } from '../entities/pedido.entity';
import { Pedido } from '../../domain/model/pedido';
import { ItemPedido } from '../../domain/model/item-pedido';
import { ItemPedidoEntity } from '../entities/item-pedido.entity';
import { PedidoConverter } from './pedido.converter';
import { Produto } from '../../domain/model/produto';
import { Categoria } from '../../domain/model/categoria';

describe('PedidoConverter', () => {
  const date = new Date();
  let itemPedido: ItemPedido;
  let itemPedidoEntity: ItemPedidoEntity;
  beforeEach(() => {
    itemPedido = new ItemPedido(
      1,
      new Produto(
        1,
        'Produto Mock',
        'Descrição Mock',
        10.0,
        date,
        Categoria.LANCHE,
      ),
      2,
      20.0,
    );

    itemPedidoEntity = new ItemPedidoEntity(
      new Produto(
        1,
        'Produto Mock',
        'Descrição Mock',
        10.0,
        date,
        Categoria.LANCHE,
      ),
      2,
      20.0,
    );
  });

  describe('toEntity', () => {
    it('should convert Pedido to PedidoEntity', () => {
      const pedido = new Pedido(123, '12345678901', [itemPedido]);
      const pedidoEntity = new PedidoEntity(
        123,
        '12345678901',
        [itemPedidoEntity],
        20.0,
      );

      const result = PedidoConverter.toEntity(pedido);
      expect(result).toEqual(pedidoEntity);
    });
  });

  describe('toPedido', () => {
    it('should convert PedidoEntity to Pedido', () => {
      const pedidoEntity = new PedidoEntity(
        123,
        '12345678901',
        [itemPedidoEntity],
        20.0,
      );
      pedidoEntity.id = 1;
      pedidoEntity.dataHoraCadastro = date;
      pedidoEntity.itensPedido[0].id = 1;

      const pedido = new Pedido(
        1,
        123,
        '12345678901',
        [itemPedido],
        20.0,
        date,
      );

      const result = PedidoConverter.toPedido(pedidoEntity);
      expect(result).toBeInstanceOf(Pedido);
      expect(result).toEqual(pedido);
    });
  });
});
