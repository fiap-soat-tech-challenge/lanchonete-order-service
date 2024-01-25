export interface ClientsService {
  existsClientByCpf(clienteCpf: string): Promise<boolean>;
}
