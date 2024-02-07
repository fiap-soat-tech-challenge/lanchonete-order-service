import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosController } from './produtos.controller';
import { ProdutosUseCases } from '../../../../usecases/produtos.use.cases';
import { ProdutoDto } from '../dtos/produto.dto';
import { Categoria } from '../../../../domain/model/categoria';
import { Produto } from '../../../../domain/model/produto';
import { ProdutoPresenter } from '../presenters/produto.presenter';

jest.mock('../../../../usecases/produtos.use.cases');

describe('ProdutosController', () => {
  let produtosController: ProdutosController;
  let produtosUseCases: ProdutosUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [ProdutosUseCases],
    }).compile();

    produtosController = module.get<ProdutosController>(ProdutosController);
    produtosUseCases = module.get<ProdutosUseCases>(ProdutosUseCases);
  });

  it('should be defined', () => {
    expect(produtosController).toBeDefined();
  });

  describe('listar', () => {
    it('should return a list of ProdutoPresenter', async () => {
      const produto = new Produto(
        1,
        'Produto 1',
        'Descrição 1',
        100,
        new Date(),
        Categoria.LANCHE,
      );

      jest
        .spyOn(produtosUseCases, 'getAllProdutos')
        .mockResolvedValue([produto]);

      const result = await produtosController.listar();

      expect(result).toEqual([new ProdutoPresenter(produto)]);
    });
  });

  describe('buscarPorCategoria', () => {
    it('should find produtos by categoria', async () => {
      const produto1 = new Produto(
        1,
        'Produto 1',
        'Descrição 1',
        100,
        new Date(),
        Categoria.LANCHE,
      );

      const produto2 = new Produto(
        2,
        'Produto 2',
        'Descrição 2',
        150,
        new Date(),
        Categoria.LANCHE,
      );

      jest
        .spyOn(produtosUseCases, 'getProdutosByCategoria')
        .mockResolvedValue([produto1, produto2]);

      const result = await produtosController.buscarPorCategoria(
        Categoria.LANCHE,
      );

      expect(result).toEqual([
        new ProdutoPresenter(produto1),
        new ProdutoPresenter(produto2),
      ]);
    });
  });

  describe('incluir', () => {
    it('should add produto successfully', async () => {
      const produtoDto = new ProdutoDto();
      produtoDto.nome = 'Novo Produto';
      produtoDto.descricao = 'Descrição do Novo Produto';
      produtoDto.preco = 120;
      produtoDto.categoria = Categoria.BEBIDA;

      const mockProduto = new Produto(
        3,
        'Novo Produto',
        'Descrição do Novo Produto',
        120,
        new Date(),
        Categoria.BEBIDA,
      );
      jest.spyOn(produtosUseCases, 'addProduto').mockResolvedValue(mockProduto);

      const result = await produtosController.incluir(produtoDto);

      expect(result).toEqual(new ProdutoPresenter(mockProduto));
    });
  });

  describe('alterar', () => {
    it('should update produto successfully', async () => {
      const produtoDto = new ProdutoDto();
      produtoDto.nome = 'Produto Atualizado';
      produtoDto.descricao = 'Descrição Atualizada';
      produtoDto.preco = 180;
      produtoDto.categoria = Categoria.ACOMPANHAMENTO;

      await produtosController.alterar(1, produtoDto);

      expect(produtosUseCases.updateProduto).toHaveBeenCalledWith(
        1,
        expect.any(Produto),
      );
    });
  });

  describe('excluir', () => {
    it('should delete produto successfully', async () => {
      await produtosController.excluir(1);

      expect(produtosUseCases.deleteProduto).toHaveBeenCalledWith(1);
    });
  });
});
