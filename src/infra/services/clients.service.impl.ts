import { Injectable } from '@nestjs/common';
import { ClientsService } from '../../domain/services/clients.service';
import { EnvironmentService } from '../config/environment/environment.service';
import { HttpClientService } from './http-client.service';

@Injectable()
export class ClientsServiceImpl implements ClientsService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly httpClientService: HttpClientService,
  ) {}

  async existsClientByCpf(clienteCpf: string): Promise<boolean> {
    const clientsServiceUrl = this.environmentService.clientsServiceUrl();
    const response = await this.httpClientService.get(
      `${clientsServiceUrl}/api/clients/clientes/${clienteCpf}`,
    );
    return response.status == 200;
  }
}
