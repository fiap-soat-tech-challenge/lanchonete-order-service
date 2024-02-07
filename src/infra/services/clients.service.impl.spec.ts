import { ClientsServiceImpl } from './clients.service.impl';
import { HttpClientService } from './http-client.service';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';

jest.mock('./http-client.service');
jest.mock('@nestjs/config');

describe('ClientsServiceImpl', () => {
  const clientsUrl = 'https://clientsservice.com';
  let clientsService: ClientsServiceImpl;
  let httpClientService: HttpClientService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsServiceImpl, HttpClientService, ConfigService],
    }).compile();

    clientsService = module.get<ClientsServiceImpl>(ClientsServiceImpl);
    httpClientService = module.get<HttpClientService>(HttpClientService);
    configService = module.get<ConfigService>(ConfigService);
    jest.spyOn(configService, 'get').mockReturnValue(clientsUrl);
  });

  it('should check if client exists by CPF', async () => {
    const clienteCpf = '12345678901';

    jest.spyOn(httpClientService, 'get').mockResolvedValueOnce({
      status: 200,
    } as AxiosResponse);

    const result = await clientsService.existsClientByCpf(clienteCpf);

    expect(configService.get).toHaveBeenCalledWith('CLIENTS_SERVICE_URL');
    expect(httpClientService.get).toHaveBeenCalledWith(
      `${clientsUrl}/api/clientes/${clienteCpf}`,
    );
    expect(result).toBe(true);
  });

  it('should return false if client does not exist by CPF', async () => {
    const clienteCpf = '12345678901';

    jest.spyOn(httpClientService, 'get').mockResolvedValueOnce({
      status: 404,
    } as AxiosResponse);

    const result = await clientsService.existsClientByCpf(clienteCpf);

    expect(configService.get).toHaveBeenCalledWith('CLIENTS_SERVICE_URL');
    expect(httpClientService.get).toHaveBeenCalledWith(
      `${clientsUrl}/api/clientes/${clienteCpf}`,
    );
    expect(result).toBe(false);
  });
});
