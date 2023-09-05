import { PedidoRepository } from '../domain/repositories/pedido.repository';
import { Pedido } from '../domain/model/pedido';

export class PedidoUseCases {
  constructor(private readonly pedidoRepository: PedidoRepository) {}

  async getAllPedidos(): Promise<Array<Pedido>> {
    return await this.pedidoRepository.findAll();
  }

  async getPedidoById(id: number): Promise<Pedido> {
    return await this.pedidoRepository.findById(id);
  }

  async getNextCodigo(): Promise<number> {
    const lastPedido = await this.pedidoRepository.findLastCodigo();
    if (lastPedido === null) {
      return 1;
    }
    return lastPedido + 1;
  }

  async addPedido(pedido: Pedido): Promise<Pedido> {
    return await this.pedidoRepository.insert(pedido);
  }
}
