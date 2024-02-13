import { Module } from '@nestjs/common';
import { RestModule } from './infra/apis/rest/rest.module';
import { RepositoriesModule } from './infra/repositories/repositories.module';
import { UseCasesProxyModule } from './infra/usecases-proxy/use-cases-proxy.module';
import { HealthModule } from './infra/health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './infra/database/database.config';
import { EntitiesModule } from './infra/entities/entities.module';
import { QueuesModule } from './infra/queues/queues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    RestModule,
    EntitiesModule,
    RepositoriesModule,
    UseCasesProxyModule,
    HealthModule,
    QueuesModule,
  ],
  providers: [DatabaseConfig],
})
export class AppModule {}
