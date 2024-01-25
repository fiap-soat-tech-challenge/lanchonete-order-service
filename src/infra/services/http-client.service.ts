import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class HttpClientService {
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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return axiosError.response;
      } else {
        throw new Error('Error making HTTP request');
      }
    }
  }
}
