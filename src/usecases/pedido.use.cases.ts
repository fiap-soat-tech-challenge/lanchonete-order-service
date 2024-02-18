import { PedidoRepository } from '../domain/repositories/pedido.repository';
import { Pedido } from '../domain/model/pedido';
import { NotFoundException } from '../domain/exceptions/not-found.exception';
import { ItemPedido } from '../domain/model/item-pedido';
import { PaymentService } from '../domain/services/payment.service';
import { ClientsService } from '../domain/services/clients.service';

export class PedidoUseCases {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly clientsService: ClientsService,
    private readonly paymentService: PaymentService,
  ) {}

  async getNextCodigo(): Promise<number> {
    const lastPedido = await this.pedidoRepository.findLastCodigo();
    if (lastPedido === null) {
      return 1;
    }
    return lastPedido + 1;
  }

  async getPedidoByOrderId(orderId: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findByOrderId(orderId);

    if (pedido === null) {
      throw new NotFoundException('Id do pedido não existe!');
    }

    return pedido;
  }

  async addPedido(
    cpfCliente: string,
    items: Array<ItemPedido>,
  ): Promise<Pedido> {
    const clienteExists = await this._checkClienteExists(cpfCliente);
    if (clienteExists === false) {
      throw new NotFoundException('CPF do cliente não existe!');
    }

    const nextCodigo = await this.getNextCodigo();

    const pedido = new Pedido(nextCodigo, cpfCliente, items);
    const pedidoSalvo = await this.pedidoRepository.insert(pedido);

    await this.paymentService.sendOrderToPayment(pedidoSalvo);

    return pedidoSalvo;
  }

  async deleteCpfCliente(cpf: string): Promise<void> {
    await this.pedidoRepository.deleteCpfCliente(cpf);
  }

  async _checkClienteExists(clienteCpf: string) {
    if (clienteCpf !== '' && clienteCpf !== null && clienteCpf !== undefined) {
      return await this.clientsService.existsClientByCpf(clienteCpf);
    }
    return true;
  }
}
