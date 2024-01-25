import { PedidoRepository } from '../../domain/repositories/pedido.repository';
import { Pedido } from '../../domain/model/pedido';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from '../entities/pedido.entity';
import { Repository } from 'typeorm';
import { PedidoConverter } from '../shared/pedido.converter';

export class PedidoRepositoryImpl implements PedidoRepository {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
  ) {}

  async findByOrderId(orderId: number): Promise<Pedido | null> {
    const pedidoEntity = await this.pedidoRepository.findOneBy({ id: orderId });
    if (pedidoEntity === null) return null;
    return PedidoConverter.toPedido(pedidoEntity);
  }

  async findLastCodigo(): Promise<number | null> {
    const lastPedidoEntity = await this.pedidoRepository.findOne({
      where: {},
      order: { id: 'DESC' },
    });
    if (lastPedidoEntity === null) return null;
    return lastPedidoEntity.codigoPedido;
  }

  async insert(pedido: Pedido): Promise<Pedido> {
    const pedidoEntityToInsert = PedidoConverter.toEntity(pedido);
    const pedidoEntity = await this.pedidoRepository.save(pedidoEntityToInsert);
    return PedidoConverter.toPedido(pedidoEntity);
  }
}
