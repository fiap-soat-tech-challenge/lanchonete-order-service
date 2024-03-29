import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemPedidoEntity } from './item-pedido.entity';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigoPedido: number;

  @Column({ nullable: true })
  cpfCliente: string;

  @OneToMany(() => ItemPedidoEntity, (item) => item.pedido, {
    cascade: true,
    eager: true,
  })
  itensPedido: Array<ItemPedidoEntity>;

  @Column()
  precoTotal: number;

  @CreateDateColumn()
  dataHoraCadastro: Date;

  constructor(
    codigoPedido: number,
    cpfCliente: string,
    itensPedido: Array<ItemPedidoEntity>,
    precoTotal: number,
  ) {
    this.codigoPedido = codigoPedido;
    this.cpfCliente = cpfCliente;
    this.itensPedido = itensPedido;
    this.precoTotal = precoTotal;
  }
}
