import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriaPresenter } from '../presenters/categoria.presenter';
import { ProdutoPresenter } from '../presenters/produto.presenter';
import { ProdutosUseCases } from '../../../../usecases/produtos.use.cases';
import { ProdutoDto } from '../dtos/produto.dto';
import { Categoria } from '../../../../domain/model/categoria';

@ApiTags('Produtos')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('/api/produtos')
export class ProdutosController {
  constructor(private produtosUseCases: ProdutosUseCases) {}

  @ApiOperation({
    summary: 'Lista todos os produtos',
    description:
      'Retorna uma lista de todos os produtos ou uma lista vazia se nenhum produto for encontrado',
  })
  @ApiOkResponse({
    isArray: true,
    type: ProdutoPresenter,
  })
  @Get()
  async listar(): Promise<Array<CategoriaPresenter>> {
    const allProdutos = await this.produtosUseCases.getAllProdutos();
    return allProdutos.map((produto) => new ProdutoPresenter(produto));
  }

  @ApiOperation({
    summary: 'Busca todos os produtos por categoria',
    description: 'Retorna todos os produtos de uma determinada categoria',
  })
  @ApiOkResponse({
    isArray: true,
    type: ProdutoPresenter,
  })
  @ApiNotFoundResponse({
    description: 'A categoria fornecida não foi encontrada',
  })
  @Get(':categoria')
  async buscarPorCategoria(
    @Param('categoria') categoria: Categoria,
  ): Promise<Array<ProdutoPresenter>> {
    const produtosByCategoria =
      await this.produtosUseCases.getProdutosByCategoria(categoria);
    return produtosByCategoria.map((produto) => new ProdutoPresenter(produto));
  }

  @ApiOperation({
    summary: 'Cadastra um novo produto',
    description:
      'Faz o cadastro de uma novo produto e retorna o produto em caso de sucesso',
  })
  @ApiOkResponse({
    type: ProdutoPresenter,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Post()
  async incluir(@Body() produtoDto: ProdutoDto): Promise<ProdutoPresenter> {
    const produto = await this.produtosUseCases.addProduto(
      produtoDto.toProduto(),
    );
    return new ProdutoPresenter(produto);
  }

  @ApiOperation({
    summary: 'Altera um produto existente',
    description: 'Altera um produto já cadastrado no sistema',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Put(':produtoId')
  async alterar(
    @Param('produtoId') produtoId: number,
    @Body() produtoDto: ProdutoDto,
  ): Promise<void> {
    await this.produtosUseCases.updateProduto(
      produtoId,
      produtoDto.toProduto(),
    );
  }

  @ApiOperation({
    summary: 'Exclui um produto existente',
    description: 'Exclui um produto cadastrado no sistema',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'O Id do produto fornecido não foi encontrado',
  })
  @Delete(':produtoId')
  async excluir(@Param('produtoId') produtoId: number): Promise<void> {
    await this.produtosUseCases.deleteProduto(produtoId);
  }
}
