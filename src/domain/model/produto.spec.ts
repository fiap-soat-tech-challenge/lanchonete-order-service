import { Categoria } from './categoria';
import { Produto } from './Produto';

describe('Produto', () => {
  const currentDate = new Date();

  it('should create Produto without id', () => {
    const exampleProdutoWithoutId = new Produto(
      'Example Produto',
      'Description of the product',
      100,
      Categoria.LANCHE,
    );

    expect(exampleProdutoWithoutId.id).toBeUndefined();
    expect(exampleProdutoWithoutId.nome).toBe('Example Produto');
    expect(exampleProdutoWithoutId.descricao).toBe(
      'Description of the product',
    );
    expect(exampleProdutoWithoutId.preco).toBe(10000);
    expect(exampleProdutoWithoutId.dataCadastro).toBeUndefined();
    expect(exampleProdutoWithoutId.categoria).toBe(Categoria.LANCHE);
  });

  it('should create Produto with id', () => {
    const exampleProdutoWithId = new Produto(
      1,
      'Example Produto',
      'Description of the product',
      100,
      currentDate,
      Categoria.LANCHE,
    );

    expect(exampleProdutoWithId.id).toBe(1);
    expect(exampleProdutoWithId.nome).toBe('Example Produto');
    expect(exampleProdutoWithId.descricao).toBe('Description of the product');
    expect(exampleProdutoWithId.preco).toBe(100);
    expect(exampleProdutoWithId.dataCadastro).toBe(currentDate);
    expect(exampleProdutoWithId.categoria).toBe(Categoria.LANCHE);
  });

  it('should set and get nome', () => {
    const produto = new Produto(
      1,
      'Example Produto',
      'Description of the product',
      100,
      currentDate,
      Categoria.LANCHE,
    );

    produto.nome = 'New Nome';

    expect(produto.nome).toBe('New Nome');
  });

  it('should set and get descricao', () => {
    const produto = new Produto(
      1,
      'Example Produto',
      'Description of the product',
      100,
      currentDate,
      Categoria.LANCHE,
    );

    produto.descricao = 'New Descricao';

    expect(produto.descricao).toBe('New Descricao');
  });

  it('should set and get preco', () => {
    const produto = new Produto(
      1,
      'Example Produto',
      'Description of the product',
      100,
      currentDate,
      Categoria.LANCHE,
    );

    produto.preco = 150;

    expect(produto.preco).toBe(150);
  });

  it('should set and get categoria', () => {
    const produto = new Produto(
      1,
      'Example Produto',
      'Description of the product',
      100,
      currentDate,
      Categoria.LANCHE,
    );

    produto.categoria = Categoria.ACOMPANHAMENTO;

    expect(produto.categoria).toBe(Categoria.ACOMPANHAMENTO);
  });
});
