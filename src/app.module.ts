import { Module } from '@nestjs/common';
import { RestModule } from './infra/apis/rest/rest.module';
import { RepositoriesModule } from './infra/repositories/repositories.module';
import { UseCasesProxyModule } from './infra/usecases-proxy/use-cases-proxy.module';
import { HealthModule } from './infra/health/health.module';

@Module({
  imports: [RestModule, RepositoriesModule, UseCasesProxyModule, HealthModule],
  providers: [],
})
export class AppModule {}
