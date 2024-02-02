import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesModule } from './entities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from '../repositories/repositories.module';
import { ProdutoEntity } from './produto.entity';
import { ItemPedidoEntity } from './item-pedido.entity';
import { PedidoEntity } from './pedido.entity';

describe('EntitiesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        EntitiesModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [ProdutoEntity, ItemPedidoEntity, PedidoEntity],
          synchronize: true,
        }),
        RepositoriesModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should export TypeOrmModule', () => {
    const typeOrmModule = module.get(TypeOrmModule);

    expect(typeOrmModule).toBeDefined();
  });

  it('should export RepositoriesModule', () => {
    const repositoriesModule = module.get(RepositoriesModule);

    expect(repositoriesModule).toBeDefined();
  });
});
