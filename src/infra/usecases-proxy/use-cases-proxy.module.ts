import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './use-case-proxy';
import { ProdutoRepositoryImpl } from '../repositories/produto.repository.impl';
import { ProdutosUseCases } from '../../usecases/produtos.use.cases';
import { PedidoRepositoryImpl } from '../repositories/pedido.repository.impl';
import { PedidoUseCases } from '../../usecases/pedido.use.cases';

@Module({
  imports: [RepositoriesModule],
})
export class UseCasesProxyModule {
  static PRODUTO_USECASES_PROXY = 'produtoUseCasesProxy';
  static PEDIDO_USECASES_PROXY = 'pedidoUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [ProdutoRepositoryImpl],
          provide: UseCasesProxyModule.PRODUTO_USECASES_PROXY,
          useFactory: (produtoRepository: ProdutoRepositoryImpl) =>
            new UseCaseProxy(new ProdutosUseCases(produtoRepository)),
        },
        {
          inject: [PedidoRepositoryImpl],
          provide: UseCasesProxyModule.PEDIDO_USECASES_PROXY,
          useFactory: (pedidoRepository: PedidoRepositoryImpl) =>
            new UseCaseProxy(new PedidoUseCases(pedidoRepository)),
        },
      ],
      exports: [
        UseCasesProxyModule.PRODUTO_USECASES_PROXY,
        UseCasesProxyModule.PEDIDO_USECASES_PROXY,
      ],
    };
  }
}
