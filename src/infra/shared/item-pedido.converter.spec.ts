import { ItemPedidoEntity } from '../entities/item-pedido.entity';
import { ItemPedidoConverter } from './item-pedido.converter';
import { Produto } from '../../domain/model/produto';
import { ItemPedido } from '../../domain/model/item-pedido';
import { Categoria } from '../../domain/model/categoria';

describe('ItemPedidoConverter', () => {
  let produtoEntityMock: Produto;
  let itemPedidoEntityMock: ItemPedidoEntity;
  let itemPedidoMock: ItemPedido;

  beforeEach(() => {
    produtoEntityMock = new Produto(
      1,
      'Produto Mock',
      'Descrição Mock',
      10.0,
      new Date(),
      Categoria.LANCHE,
    );

    itemPedidoEntityMock = new ItemPedidoEntity(produtoEntityMock, 2, 20.0);

    itemPedidoMock = new ItemPedido(1, produtoEntityMock, 2, 20.0);
  });

  describe('toItemPedido', () => {
    it('should convert ItemPedidoEntity to ItemPedido', () => {
      itemPedidoEntityMock.id = 1;
      const result = ItemPedidoConverter.toItemPedido(itemPedidoEntityMock);
      expect(result).toEqual(itemPedidoMock);
    });
  });

  describe('toItensPedido', () => {
    it('should convert an array of ItemPedidoEntity to an array of ItemPedido', () => {
      itemPedidoEntityMock.id = 1;
      const itemsArrayMock: ItemPedidoEntity[] = [itemPedidoEntityMock];
      const result = ItemPedidoConverter.toItensPedido(itemsArrayMock);
      expect(result).toEqual([itemPedidoMock]);
    });
  });

  describe('toItemPedidoEntity', () => {
    it('should convert ItemPedido to ItemPedidoEntity', () => {
      const result = ItemPedidoConverter.toItemPedidoEntity(itemPedidoMock);
      expect(result.produto).toEqual(itemPedidoEntityMock.produto);
      expect(result.quantidade).toEqual(itemPedidoEntityMock.quantidade);
      expect(result.preco).toEqual(itemPedidoEntityMock.preco);
    });
  });

  describe('toItensPedidoEntity', () => {
    it('should convert an array of ItemPedido to an array of ItemPedidoEntity', () => {
      const itemsArrayMock: ItemPedido[] = [itemPedidoMock];
      const result = ItemPedidoConverter.toItensPedidoEntity(itemsArrayMock);
      expect(result).toEqual([itemPedidoEntityMock]);
    });
  });
});
