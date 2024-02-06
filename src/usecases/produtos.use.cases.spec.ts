import { ProdutoRepository } from '../domain/repositories/produto.repository';
import { Produto } from '../domain/model/produto';
import { ProdutosUseCases } from './produtos.use.cases';
import { Categoria } from '../domain/model/categoria';

describe('ProdutosUseCases', () => {
  let mockProdutoRepository: jest.Mocked<ProdutoRepository>;
  let produtosUseCases: ProdutosUseCases;
  const produto: Produto = new Produto(
    1,
    'Example Produto',
    'Description of the product',
    100,
    new Date(),
    Categoria.LANCHE,
  );

  beforeEach(() => {
    mockProdutoRepository = {
      findAll: jest.fn(),
      findByCategoria: jest.fn(),
      findById: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    produtosUseCases = new ProdutosUseCases(mockProdutoRepository);
  });

  it('should getAllProdutos call repository.findAll', async () => {
    await produtosUseCases.getAllProdutos();

    expect(mockProdutoRepository.findAll).toHaveBeenCalled();
  });

  it('should get all produtos', async () => {
    mockProdutoRepository.findAll.mockResolvedValue([produto]);

    const result = await produtosUseCases.getAllProdutos();

    expect(result).toEqual([produto]);
    expect(mockProdutoRepository.findAll).toHaveBeenCalled();
  });

  it('should get produtos by categoria', async () => {
    mockProdutoRepository.findByCategoria.mockResolvedValue([produto]);

    const result = await produtosUseCases.getProdutosByCategoria(
      Categoria.LANCHE,
    );

    expect(result).toEqual([produto]);
    expect(mockProdutoRepository.findByCategoria).toHaveBeenCalledWith(
      Categoria.LANCHE,
    );
  });

  it('should get produto by id', async () => {
    mockProdutoRepository.findById.mockResolvedValue(produto);

    const result = await produtosUseCases.getProdutoById(1);

    expect(result).toEqual(produto);
    expect(mockProdutoRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should add produto', async () => {
    mockProdutoRepository.insert.mockResolvedValue(produto);

    const result = await produtosUseCases.addProduto(produto);

    expect(result).toEqual(produto);
    expect(mockProdutoRepository.insert).toHaveBeenCalledWith(produto);
  });

  it('should update produto', async () => {
    mockProdutoRepository.findById.mockResolvedValue(produto);
    mockProdutoRepository.update.mockResolvedValue();

    await produtosUseCases.updateProduto(1, produto);

    expect(mockProdutoRepository.findById).toHaveBeenCalledWith(1);
    expect(mockProdutoRepository.update).toHaveBeenCalledWith(1, produto);
  });

  it('should delete produto', async () => {
    mockProdutoRepository.delete.mockResolvedValue();

    await produtosUseCases.deleteProduto(1);

    expect(mockProdutoRepository.delete).toHaveBeenCalledWith(1);
  });
});
