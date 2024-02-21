import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
import { PedidoUseCases } from '../../../../usecases/pedido.use.cases';
import { ProdutosUseCases } from '../../../../usecases/produtos.use.cases';
import { Produto } from '../../../../domain/model/produto';
import { ItemPedido } from '../../../../domain/model/item-pedido';

@ApiTags('Pedidos')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('/api/pedidos')
export class PedidosController {
  constructor(
    private pedidoUseCases: PedidoUseCases,
    private produtosUseCases: ProdutosUseCases,
  ) {}

  @ApiExcludeEndpoint()
  @Get(':pedidoId')
  async view(@Param('pedidoId') pedidoId: number): Promise<PedidoPresenter> {
    const pedido = await this.pedidoUseCases.getPedidoByOrderId(pedidoId);
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
        const produto: Produto = await this.produtosUseCases.getProdutoById(
          item.produtoId,
        );
        return new ItemPedido(produto, item.quantidade);
      }),
    );

    const pedido = await this.pedidoUseCases.addPedido(
      pedidoDto.cpfCliente,
      items,
    );

    return new PedidoPresenter(pedido);
  }
}
