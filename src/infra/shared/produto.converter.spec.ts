import { ProdutoEntity } from '../entities/produto.entity';
import { ProdutoConverter } from './produto.converter';
import { Produto } from '../../domain/model/produto';
import { Categoria } from '../../domain/model/categoria';

describe('ProdutoConverter', () => {
  const currentDate = new Date();
  const produto = new Produto(
    1,
    'Produto Mock',
    'Descrição Mock',
    10.0,
    currentDate,
    Categoria.LANCHE,
  );

  const produtoEntity = new ProdutoEntity(
    'Produto Mock',
    'Descrição Mock',
    10.0,
    Categoria.LANCHE,
  );

  describe('toProduto', () => {
    it('should convert ProdutoEntity to Produto', () => {
      const result = ProdutoConverter.toProduto(produtoEntity);
      expect(result.nome).toEqual(produto.nome);
      expect(result.descricao).toEqual(produto.descricao);
      expect(result.preco).toEqual(produto.preco);
      expect(result.categoria).toEqual(produto.categoria);
    });
  });

  describe('toProdutoEntity', () => {
    it('should convert Produto to ProdutoEntity', () => {
      const result = ProdutoConverter.toProdutoEntity(produto);
      expect(result).toEqual(produtoEntity);
    });
  });
});
