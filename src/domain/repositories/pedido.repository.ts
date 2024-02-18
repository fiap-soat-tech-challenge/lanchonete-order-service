import { Pedido } from '../model/pedido';

export interface PedidoRepository {
  findByOrderId(orderId: number): Promise<Pedido | null>;
  findLastCodigo(): Promise<number | null>;
  insert(pedido: Pedido): Promise<Pedido>;
  deleteCpfCliente(cpf: string): Promise<void>;
}
