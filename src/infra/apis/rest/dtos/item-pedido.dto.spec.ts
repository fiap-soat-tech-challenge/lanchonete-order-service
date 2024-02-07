import { ItemPedidoDto } from './item-pedido.dto';

describe('ItemPedidoDto', () => {
  it('should create ItemPedidoDto instance', () => {
    const itemPedidoDto = new ItemPedidoDto();
    itemPedidoDto.produtoId = 1;
    itemPedidoDto.quantidade = 2;

    expect(itemPedidoDto).toBeDefined();
    expect(itemPedidoDto.produtoId).toBe(1);
    expect(itemPedidoDto.quantidade).toBe(2);
  });

  it('should create ItemPedidoDto instance with default values', () => {
    const itemPedidoDto = new ItemPedidoDto();

    expect(itemPedidoDto).toBeDefined();
    expect(itemPedidoDto.produtoId).toBeUndefined();
    expect(itemPedidoDto.quantidade).toBeUndefined();
  });

  it('should create ItemPedidoDto instance with undefined produtoId', () => {
    const itemPedidoDto = new ItemPedidoDto();
    itemPedidoDto.produtoId = undefined;
    itemPedidoDto.quantidade = 1;

    expect(itemPedidoDto).toBeDefined();
    expect(itemPedidoDto.produtoId).toBeUndefined();
    expect(itemPedidoDto.quantidade).toBe(1);
  });

  it('should create ItemPedidoDto instance with zero quantidade', () => {
    const itemPedidoDto = new ItemPedidoDto();
    itemPedidoDto.produtoId = 1;
    itemPedidoDto.quantidade = 0;

    expect(itemPedidoDto).toBeDefined();
    expect(itemPedidoDto.produtoId).toBe(1);
    expect(itemPedidoDto.quantidade).toBe(0);
  });

  it('should create ItemPedidoDto instance with negative quantidade', () => {
    const itemPedidoDto = new ItemPedidoDto();
    itemPedidoDto.produtoId = 1;
    itemPedidoDto.quantidade = -1;

    expect(itemPedidoDto).toBeDefined();
    expect(itemPedidoDto.produtoId).toBe(1);
    expect(itemPedidoDto.quantidade).toBe(-1);
  });
});
