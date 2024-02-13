import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ProdutoRepositoryImpl } from '../repositories/produto.repository.impl';
import { ProdutosUseCases } from '../../usecases/produtos.use.cases';
import { PedidoRepositoryImpl } from '../repositories/pedido.repository.impl';
import { PedidoUseCases } from '../../usecases/pedido.use.cases';
import { ServicesModule } from '../services/services.module';
import { PaymentQueueServiceImpl } from '../services/payment-queue.service.impl';
import { ClientsServiceImpl } from '../services/clients.service.impl';
import { ProdutoRepository } from '../../domain/repositories/produto.repository';
import { PedidoRepository } from '../../domain/repositories/pedido.repository';
import { ClientsService } from '../../domain/services/clients.service';
import { PaymentService } from '../../domain/services/payment.service';

const createProdutoUseCase = (produtoRepository: ProdutoRepository) => {
  return new ProdutosUseCases(produtoRepository);
};

const createPedidoUseCase = (
  pedidoRepository: PedidoRepository,
  ClientsService: ClientsService,
  paymentService: PaymentService,
) => {
  return new PedidoUseCases(pedidoRepository, ClientsService, paymentService);
};

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    {
      provide: ProdutosUseCases,
      useFactory: createProdutoUseCase,
      inject: [ProdutoRepositoryImpl],
    },
    {
      provide: PedidoUseCases,
      useFactory: createPedidoUseCase,
      inject: [
        PedidoRepositoryImpl,
        ClientsServiceImpl,
        PaymentQueueServiceImpl,
      ],
    },
  ],
  exports: [ProdutosUseCases, PedidoUseCases],
})
export class UseCasesProxyModule {}
