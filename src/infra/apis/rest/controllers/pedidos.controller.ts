import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PedidoPresenter } from '../presenters/pedido.presenter';
import { PedidoDto } from '../dtos/pedido.dto';
import { UseCaseProxy } from '../../../usecases-proxy/use-case-proxy';
import { PedidoUseCases } from '../../../../usecases/pedido.use.cases';
import { UseCasesProxyModule } from '../../../usecases-proxy/use-cases-proxy.module';
import { ProdutosUseCases } from '../../../../usecases/produtos.use.cases';
import { Produto } from '../../../../domain/model/produto';
import { ItemPedido } from '../../../../domain/model/item-pedido';
import { HttpClientService } from '../../../services/http-client.service';
import { EnvironmentService } from '../../../config/environment/environment.service';

@ApiTags('Pedidos')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('/api/pedidos')
export class PedidosController {
  constructor(
    @Inject(UseCasesProxyModule.PEDIDO_USECASES_PROXY)
    private pedidoUseCasesUseCaseProxy: UseCaseProxy<PedidoUseCases>,
    @Inject(UseCasesProxyModule.PRODUTO_USECASES_PROXY)
    private produtosUseCasesUseCaseProxy: UseCaseProxy<ProdutosUseCases>,
    private readonly httpClientService: HttpClientService,
    private readonly envie: EnvironmentService,
  ) {}

  @ApiExcludeEndpoint()
  @Get(':pedidoId')
  async view(@Param('pedidoId') pedidoId: number): Promise<PedidoPresenter> {
    const pedido = await this.pedidoUseCasesUseCaseProxy
      .getInstance()
      .getPedidoByOrderId(pedidoId);
    return new PedidoPresenter(pedido);
  }

  @ApiOperation({
    summary: 'Cria um novo pedido',
    description:
      'Faz o cadastro de uma novo pedido e retorna o pedido em caso de sucesso',
  })
  @ApiOkResponse({
    type: PedidoPresenter,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Post()
  async incluir(@Body() pedidoDto: PedidoDto): Promise<PedidoPresenter> {
    const items = await Promise.all(
      pedidoDto.itensPedido.map(async (item) => {
        const produto: Produto = await this.produtosUseCasesUseCaseProxy
          .getInstance()
          .getProdutoById(item.produtoId);
        return new ItemPedido(produto, item.quantidade);
      }),
    );

    const pedido = await this.pedidoUseCasesUseCaseProxy
      .getInstance()
      .addPedido(pedidoDto.cpfCliente, items);

    return new PedidoPresenter(pedido);
  }
}
