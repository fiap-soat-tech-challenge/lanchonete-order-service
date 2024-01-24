import { ApiProperty } from '@nestjs/swagger';
import { Pedido } from '../../../../domain/model/pedido';
import { ItemPedidoPresenter } from './item-pedido.presenter';

export class PedidoPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly codigoPedido: number;

  @ApiProperty()
  readonly cpfCliente: string;

  @ApiProperty()
  readonly itensPedido: Array<ItemPedidoPresenter>;

  @ApiProperty()
  readonly precoTotal: number;

  @ApiProperty()
  readonly dataHoraCadastro: Date;

  public constructor(pedido: Pedido) {
    this.id = pedido.id;
    this.codigoPedido = pedido.codigoPedido;
    this.cpfCliente = pedido.cpfCliente;
    this.itensPedido = pedido.itensPedido.map(
      (item) => new ItemPedidoPresenter(item),
    );
    this.precoTotal = pedido.precoTotal / 100;
    this.dataHoraCadastro = pedido.dataHoraCadastro;
  }
}
