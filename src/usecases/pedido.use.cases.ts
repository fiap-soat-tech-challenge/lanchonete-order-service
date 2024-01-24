import { PedidoRepository } from '../domain/repositories/pedido.repository';
import { Pedido } from '../domain/model/pedido';
import { NotFoundException } from '../domain/exceptions/not-found.exception';
import { ItemPedido } from '../domain/model/item-pedido';
import { HttpClientService } from '../infra/services/http-client.service';
import { EnvironmentService } from '../infra/config/environment/environment.service';

export class PedidoUseCases {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly httpClientService: HttpClientService,
    private readonly environmentService: EnvironmentService,
  ) {}

  async getNextCodigo(): Promise<number> {
    const lastPedido = await this.pedidoRepository.findLastCodigo();
    if (lastPedido === null) {
      return 1;
    }
    return lastPedido + 1;
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
    return await this.pedidoRepository.insert(pedido);
  }

  async _checkClienteExists(clienteCpf: string) {
    if (clienteCpf !== '' && clienteCpf !== null && clienteCpf !== undefined) {
      const clientsServiceUrl = this.environmentService.clientsServiceUrl();
      const response = await this.httpClientService.get(
        `${clientsServiceUrl}/api/clientes/${clienteCpf}`,
      );

      return response.status == 200;
    }
    return true;
  }
}
