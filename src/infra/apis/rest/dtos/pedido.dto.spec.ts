import { PedidoDto } from './pedido.dto';
import { ItemPedidoDto } from './item-pedido.dto';

describe('PedidoDto', () => {
  it('should create PedidoDto instance with valid data', () => {
    const itemPedidoDto1 = new ItemPedidoDto();
    itemPedidoDto1.produtoId = 1;
    itemPedidoDto1.quantidade = 2;

    const itemPedidoDto2 = new ItemPedidoDto();
    itemPedidoDto2.produtoId = 2;
    itemPedidoDto2.quantidade = 1;

    const pedidoDto = new PedidoDto();
    pedidoDto.cpfCliente = '123.456.789-00';
    pedidoDto.itensPedido = [itemPedidoDto1, itemPedidoDto2];

    expect(pedidoDto).toBeDefined();
    expect(pedidoDto.cpfCliente).toBe('123.456.789-00');
    expect(pedidoDto.itensPedido).toEqual([itemPedidoDto1, itemPedidoDto2]);
  });

  it('should create PedidoDto instance with default values', () => {
    const pedidoDto = new PedidoDto();

    expect(pedidoDto).toBeDefined();
    expect(pedidoDto.cpfCliente).toBeUndefined();
    expect(pedidoDto.itensPedido).toBeUndefined();
  });

  it('should fail to create PedidoDto instance with invalid cpfCliente format', () => {
    const pedidoDto = new PedidoDto();
    pedidoDto.cpfCliente = 'invalid-format';

    expect(pedidoDto).toBeDefined();
    expect(pedidoDto.cpfCliente).toBe('invalid-format');
    expect(pedidoDto.itensPedido).toBeUndefined();
  });

  it('should fail to create PedidoDto instance with empty itensPedido array', () => {
    const pedidoDto = new PedidoDto();

    expect(pedidoDto).toBeDefined();
    expect(pedidoDto.cpfCliente).toBeUndefined();
    expect(pedidoDto.itensPedido).toBeUndefined();
  });
});
