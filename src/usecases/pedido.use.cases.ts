import { PedidoRepository } from '../domain/repositories/pedido.repository';
import { Pedido } from '../domain/model/pedido';
import { Situacao } from '../domain/model/situacao';
import { NotFoundException } from '../domain/exceptions/not-found.exception';
import { ItemPedido } from '../domain/model/item-pedido';

export class PedidoUseCases {
  constructor(private readonly pedidoRepository: PedidoRepository) {}

  async getAllPedidos(): Promise<Array<Pedido>> {
    return await this.pedidoRepository.findAll();
  }

  async getAllPedidosSorted(): Promise<Array<Pedido>> {
    const allPedidos = await this.getAllPedidos();

    return allPedidos
      .filter((pedido) => {
        return pedido.situacao !== 'FINALIZADO';
      })
      .sort((a, b) => {
        const ordemSituacao = [
          Situacao.PRONTO,
          Situacao.EM_PREPARACAO,
          Situacao.RECEBIDO,
        ];

        return (
          ordemSituacao.indexOf(a.situacao) - ordemSituacao.indexOf(b.situacao)
        );
      });
  }

  async getPedidoById(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findById(id);

    if (pedido === null) {
      throw new NotFoundException('Id do pedido não existe!');
    }

    return pedido;
  }

  async getNextCodigo(): Promise<number> {
    const lastPedido = await this.pedidoRepository.findLastCodigo();
    if (lastPedido === null) {
      return 1;
    }
    return lastPedido + 1;
  }

  async addPedido(
    clienteCpf: string,
    items: Array<ItemPedido>,
  ): Promise<Pedido> {
    const cliente = null;
    // TODO: Validar CPF no outro microserviço
    // if (clienteCpf !== '' && clienteCpf !== null && clienteCpf !== undefined) {
    //   cliente = await this.clienteUseCases.getClienteByCpf(clienteCpf);
    // }

    const nextCodigo = await this.getNextCodigo();

    const pedido = new Pedido(nextCodigo, cliente, items);
    return await this.pedidoRepository.insert(pedido);
  }

  async updateStatusPedido(pedidoId: number, situacao: Situacao) {
    const pedido = await this.getPedidoById(pedidoId);
    pedido.situacao = situacao;
    await this.pedidoRepository.update(pedidoId, pedido);
  }
}
