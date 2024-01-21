import { Situacao } from '../../domain/model/situacao';
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

  @Column()
  cpfCliente: string;

  @OneToMany(() => ItemPedidoEntity, (item) => item.pedido, {
    cascade: true,
    eager: true,
  })
  itensPedido: Array<ItemPedidoEntity>;

  @Column()
  precoTotal: number;

  @Column({
    type: 'enum',
    enum: Situacao,
    default: Situacao.RECEBIDO,
  })
  situacao: Situacao;

  @CreateDateColumn()
  dataHoraCadastro: Date;

  constructor(
    codigoPedido: number,
    cpfCliente: string,
    itensPedido: Array<ItemPedidoEntity>,
    precoTotal: number,
    situacao: Situacao,
  ) {
    this.codigoPedido = codigoPedido;
    this.cpfCliente = cpfCliente;
    this.itensPedido = itensPedido;
    this.precoTotal = precoTotal;
    this.situacao = situacao;
  }
}
