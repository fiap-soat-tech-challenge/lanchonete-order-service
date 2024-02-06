import { ItemPedido } from './item-pedido';
import { Pedido } from './pedido';
import { Produto } from './produto';
import { Categoria } from './categoria';

describe('Pedido', () => {
  const currentDate = new Date();
  const exampleItemPedido: ItemPedido = new ItemPedido(
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
  const exampleItensPedido: ItemPedido[] = [exampleItemPedido];

  it('should create Pedido without id', () => {
    const examplePedidoWithoutId = new Pedido(
      1,
      '12345678901',
      exampleItensPedido,
    );

    expect(examplePedidoWithoutId.id).toBeUndefined();
    expect(examplePedidoWithoutId.codigoPedido).toBe(1);
    expect(examplePedidoWithoutId.cpfCliente).toBe('12345678901');
    expect(examplePedidoWithoutId.itensPedido).toEqual(exampleItensPedido);
    expect(examplePedidoWithoutId.precoTotal).toBe(200);
    expect(examplePedidoWithoutId.dataHoraCadastro).toBeUndefined();
  });

  it('should create Pedido with id', () => {
    const examplePedidoWithId = new Pedido(
      1,
      1,
      '12345678901',
      exampleItensPedido,
      200,
      currentDate,
    );

    expect(examplePedidoWithId.id).toBe(1);
    expect(examplePedidoWithId.codigoPedido).toBe(1);
    expect(examplePedidoWithId.cpfCliente).toBe('12345678901');
    expect(examplePedidoWithId.itensPedido).toEqual(exampleItensPedido);
    expect(examplePedidoWithId.precoTotal).toBe(200);
    expect(examplePedidoWithId.dataHoraCadastro).toBe(currentDate);
  });

  it('should calculate precoTotal based on itensPedido', () => {
    const pedido = new Pedido(1, '12345678901', exampleItensPedido);

    expect(pedido.precoTotal).toBe(200);
  });
});
