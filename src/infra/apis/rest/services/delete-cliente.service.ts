import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PedidoUseCases } from '../../../../usecases/pedido.use.cases';

@Injectable()
export class DeleteClienteService {
  private readonly logger = new Logger(DeleteClienteService.name);
  constructor(private pedidoUseCases: PedidoUseCases) {}
  @RabbitSubscribe({
    queue: 'delete_cliente_orders',
  })
  public async newOrderHandler(cpf: string): Promise<void> {
    this.logger.log('[Delete] Deletando CPF do Cliente nos pedidos');
    await this.pedidoUseCases.deleteCpfCliente(cpf);
  }
}
