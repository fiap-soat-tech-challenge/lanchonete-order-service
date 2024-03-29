import { Injectable } from '@nestjs/common';
import { ClientsService } from '../../domain/services/clients.service';
import { HttpClientService } from './http-client.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientsServiceImpl implements ClientsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpClientService: HttpClientService,
  ) {}

  /*
    Verifica se o cliente existe no serviço de clientes
   */
  async existsClientByCpf(clienteCpf: string): Promise<boolean> {
    const clientsUrl = this.configService.get('CLIENTS_SERVICE_URL');
    const response = await this.httpClientService.get(
      `${clientsUrl}/api/clientes/${clienteCpf}`,
    );
    return response.status == 200;
  }
}
