import { Produto } from './produto';
import { ItemPedido } from './item-pedido';
import { Categoria } from './categoria';

describe('ItemPedido', () => {
  const exampleProduto: Produto = new Produto(
    1,
    'Example Produto',
    'Description of the product',
    100,
    new Date(),
    Categoria.LANCHE,
  );

  const exampleItemPedido: ItemPedido = new ItemPedido(exampleProduto, 2);

  it('should create ItemPedido with Produto and quantidade', () => {
    expect(exampleItemPedido.produto).toEqual(exampleProduto);
    expect(exampleItemPedido.quantidade).toBe(2);
    expect(exampleItemPedido.preco).toBe(200);
  });

  it('should create ItemPedido with id, Produto, quantidade, and preco', () => {
    const itemPedidoWithId = new ItemPedido(1, exampleProduto, 2, 200);

    expect(itemPedidoWithId.id).toBe(1);
    expect(itemPedidoWithId.produto).toEqual(exampleProduto);
    expect(itemPedidoWithId.quantidade).toBe(2);
    expect(itemPedidoWithId.preco).toBe(200);
  });

  it('should create ItemPedido with id, Produto, quantidade, and preco using constructor', () => {
    const itemPedidoWithId = new ItemPedido(1, exampleProduto, 2, 200);

    expect(itemPedidoWithId.id).toBe(1);
    expect(itemPedidoWithId.produto).toEqual(exampleProduto);
    expect(itemPedidoWithId.quantidade).toBe(2);
    expect(itemPedidoWithId.preco).toBe(200);
  });

  it('should create ItemPedido with Produto and quantidade using constructor', () => {
    const itemPedidoWithoutId = new ItemPedido(exampleProduto, 2);

    expect(itemPedidoWithoutId.produto).toEqual(exampleProduto);
    expect(itemPedidoWithoutId.quantidade).toBe(2);
    expect(itemPedidoWithoutId.preco).toBe(200);
  });
});
