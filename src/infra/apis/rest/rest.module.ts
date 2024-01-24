import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { ProdutosController } from './controllers/produtos.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { ServicesModule } from '../../services/services.module';
import { EnvironmentModule } from '../../config/environment/environment.module';

@Module({
  imports: [UseCasesProxyModule.register(), ServicesModule, EnvironmentModule],
  controllers: [
    HomeController,
    CategoriasController,
    ProdutosController,
    PedidosController,
  ],
})
export class RestModule {}
