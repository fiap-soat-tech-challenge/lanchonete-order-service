import { Pedido } from '../model/pedido';

export interface PaymentQueueService {
  sendOrderToPaymentQueue(pedido: Pedido): Promise<void>;
}
