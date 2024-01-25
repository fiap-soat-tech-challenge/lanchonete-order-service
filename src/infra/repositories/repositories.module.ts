import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../config/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from '../entities/produto.entity';
import { ProdutoRepositoryImpl } from './produto.repository.impl';
import { PedidoEntity } from '../entities/pedido.entity';
import { PedidoRepositoryImpl } from './pedido.repository.impl';
import { ItemPedidoEntity } from '../entities/item-pedido.entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([ProdutoEntity, PedidoEntity, ItemPedidoEntity]),
  ],
  providers: [ProdutoRepositoryImpl, PedidoRepositoryImpl],
  exports: [ProdutoRepositoryImpl, PedidoRepositoryImpl],
})
export class RepositoriesModule {}
