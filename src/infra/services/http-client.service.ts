import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  async get(url: string): Promise<AxiosResponse<any, any>> {
    return await this.makeRequest('GET', url);
  }

  async post(url: string, data: any): Promise<AxiosResponse<any, any>> {
    return await this.makeRequest('POST', url, data);
  }

  async makeRequest(method: string, url: string, data: any = null) {
    try {
      return await axios({ method: method, url: url, data: data });
    } catch (error) {
      throw new Error(`Error making HTTP request: ${error.message}`);
    }
  }
}
