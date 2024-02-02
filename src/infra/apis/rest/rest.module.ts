import { Module } from '@nestjs/common';
import { CategoriasController } from './controllers/categorias.controller';
import { ProdutosController } from './controllers/produtos.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { ServicesModule } from '../../services/services.module';

@Module({
  imports: [UseCasesProxyModule, ServicesModule],
  controllers: [CategoriasController, ProdutosController, PedidosController],
})
export class RestModule {}
