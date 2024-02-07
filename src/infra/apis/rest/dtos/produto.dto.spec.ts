import { ProdutoDto } from './produto.dto';
import { Categoria } from '../../../../domain/model/categoria';
import { Produto } from '../../../../domain/model/produto';

describe('ProdutoDto', () => {
  it('should create Produto instance from ProdutoDto', () => {
    const produtoDto = new ProdutoDto();
    produtoDto.nome = 'Example Produto';
    produtoDto.descricao = 'Description of the product';
    produtoDto.preco = 100;
    produtoDto.categoria = Categoria.LANCHE;

    const produtoInstance = produtoDto.toProduto();

    expect(produtoInstance).toBeDefined();
    expect(produtoInstance.nome).toBe('Example Produto');
    expect(produtoInstance.descricao).toBe('Description of the product');
    expect(produtoInstance.preco).toBe(10000);
    expect(produtoInstance.categoria).toBe(Categoria.LANCHE);
  });

  it('should create Produto instance with default values', () => {
    const produtoDto = new ProdutoDto();

    const produto = produtoDto.toProduto();

    expect(produto).toBeInstanceOf(Produto);
  });
});
