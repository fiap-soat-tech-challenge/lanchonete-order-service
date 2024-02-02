import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ProdutoEntity } from './produto.entity';
import { ItemPedidoEntity } from './item-pedido.entity';
import { PedidoEntity } from './pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProdutoEntity, ItemPedidoEntity, PedidoEntity]),
    RepositoriesModule,
  ],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
