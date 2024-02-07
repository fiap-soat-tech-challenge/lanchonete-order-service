import { DeleteResult, Equal } from 'typeorm';
import { ProdutoEntity } from '../entities/produto.entity';
import { Produto } from '../../domain/model/produto';
import { Categoria } from '../../domain/model/categoria';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProdutoRepositoryImpl } from './produto.repository.impl';
import { ProdutoConverter } from '../shared/produto.converter';

describe('ProdutoRepositoryImpl', () => {
  const currentDate = new Date();
  let produtoRepository: ProdutoRepositoryImpl;

  const mockProdutoEntityRepository = {
    find: jest.fn(),
    findBy: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const exampleProduto: Produto = new Produto(
    1,
    'Produto 1',
    'Description of the product 1',
    100,
    currentDate,
    Categoria.LANCHE,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoRepositoryImpl,
        {
          provide: getRepositoryToken(ProdutoEntity),
          useValue: mockProdutoEntityRepository,
        },
      ],
    }).compile();

    produtoRepository = module.get<ProdutoRepositoryImpl>(
      ProdutoRepositoryImpl,
    );
  });

  it('should be defined', () => {
    expect(produtoRepository).toBeDefined();
  });

  it('should find all produtos', async () => {
    const produto1 = new Produto(
      1,
      'Produto 1',
      'Description of the product 1',
      100,
      currentDate,
      Categoria.LANCHE,
    );
    const produto2 = new Produto(
      2,
      'Produto 2',
      'Description of the product 2',
      150,
      currentDate,
      Categoria.ACOMPANHAMENTO,
    );

    mockProdutoEntityRepository.find.mockResolvedValue([produto1, produto2]);

    const result = await produtoRepository.findAll();

    expect(result).toEqual([produto1, produto2]);
    expect(mockProdutoEntityRepository.find).toHaveBeenCalled();
  });

  it('should find produtos by categoria', async () => {
    mockProdutoEntityRepository.findBy.mockResolvedValue([exampleProduto]);

    const result = await produtoRepository.findByCategoria(Categoria.LANCHE);

    expect(mockProdutoEntityRepository.findBy).toHaveBeenCalledTimes(1);
    expect(result).toEqual([exampleProduto]);
  });

  it('should find produto by id', async () => {
    mockProdutoEntityRepository.findOneBy.mockResolvedValue(exampleProduto);

    const result = await produtoRepository.findById(1);

    expect(result).toEqual(exampleProduto);
    expect(mockProdutoEntityRepository.findOneBy).toHaveBeenCalledWith({
      id: Equal(1),
    });
  });

  it('should throw NotFound exception when finding non-existing produto by id', async () => {
    mockProdutoEntityRepository.findOneBy.mockResolvedValue(undefined);

    await expect(produtoRepository.findById(1)).rejects.toThrowError(
      new HttpException('NotFound', HttpStatus.NOT_FOUND),
    );

    expect(mockProdutoEntityRepository.findOneBy).toHaveBeenCalledWith({
      id: Equal(1),
    });
  });

  it('should insert produto', async () => {
    const produto = new Produto(
      2,
      'Produto 2',
      'Description of the product 2',
      150,
      currentDate,
      Categoria.ACOMPANHAMENTO,
    );
    const produtoEntityToInsert = ProdutoConverter.toProdutoEntity(produto);
    mockProdutoEntityRepository.save.mockResolvedValue(produtoEntityToInsert);

    const result = await produtoRepository.insert(produto);

    expect(mockProdutoEntityRepository.save).toHaveBeenCalledWith(
      produtoEntityToInsert,
    );
    expect(result).toEqual(ProdutoConverter.toProduto(produtoEntityToInsert));
  });

  it('should update produto', async () => {
    const produto: Produto = new Produto(
      1,
      'Produto 1',
      'Description of the product 1',
      100,
      currentDate,
      Categoria.LANCHE,
    );

    await produtoRepository.update(1, produto);

    expect(mockProdutoEntityRepository.update).toHaveBeenCalledWith(
      1,
      expect.objectContaining(ProdutoConverter.toProdutoEntity(produto)),
    );
  });

  it('should delete produto', async () => {
    mockProdutoEntityRepository.delete.mockResolvedValue({} as DeleteResult);

    await produtoRepository.delete(1);

    expect(mockProdutoEntityRepository.delete).toHaveBeenCalledWith(1);
  });
});
