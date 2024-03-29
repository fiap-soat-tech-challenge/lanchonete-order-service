import { Categoria } from '../../../../domain/model/categoria';
import { ApiProperty } from '@nestjs/swagger';
import { Produto } from '../../../../domain/model/produto';

export class ProdutoPresenter {
  @ApiProperty()
  readonly id: number | null;

  @ApiProperty()
  readonly nome: string;

  @ApiProperty()
  readonly descricao: string;

  @ApiProperty()
  readonly preco: number;

  @ApiProperty()
  readonly categoria: Categoria;

  public constructor(produto: Produto) {
    this.id = produto.id;
    this.nome = produto.nome;
    this.descricao = produto.descricao;
    this.preco = produto.preco / 100;
    this.categoria = produto.categoria;
  }
}
