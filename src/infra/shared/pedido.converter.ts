import { PedidoEntity } from '../entities/pedido.entity';
import { Pedido } from '../../domain/model/pedido';
import { ItemPedidoConverter } from './item-pedido.converter';

export class PedidoConverter {
  public static toPedido(pedidoEntity: PedidoEntity): Pedido {
    let itensPedidos = null;
    if (pedidoEntity.itensPedido) {
      itensPedidos = ItemPedidoConverter.toItensPedido(
        pedidoEntity.itensPedido,
      );
    }

    return new Pedido(
      pedidoEntity.id,
      pedidoEntity.codigoPedido,
      pedidoEntity.cpfCliente,
      itensPedidos,
      pedidoEntity.precoTotal,
      pedidoEntity.situacao,
      pedidoEntity.dataHoraCadastro,
    );
  }

  public static toEntity(pedido: Pedido): PedidoEntity {
    const itensPedidosEntity = ItemPedidoConverter.toItensPedidoEntity(
      pedido.itensPedido,
    );

    const pedidoEntity = new PedidoEntity(
      pedido.codigoPedido,
      pedido.cpfCliente,
      itensPedidosEntity,
      pedido.precoTotal,
      pedido.situacao,
    );

    if (pedido.id && pedido.dataHoraCadastro) {
      pedidoEntity.id = pedido.id;
      pedidoEntity.dataHoraCadastro = pedido.dataHoraCadastro;
    }

    return pedidoEntity;
  }
}
