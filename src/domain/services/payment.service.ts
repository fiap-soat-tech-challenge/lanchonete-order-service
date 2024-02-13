import { Pedido } from '../model/pedido';

export interface PaymentService {
  sendOrderToPayment(pedido: Pedido): Promise<void>;
}
