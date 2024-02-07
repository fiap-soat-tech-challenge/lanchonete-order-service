import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientService } from './http-client.service';
import axios, { AxiosError, AxiosResponse } from 'axios';

jest.mock('axios');

describe('HttpClientService', () => {
  let httpClientService: HttpClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpClientService],
    }).compile();

    httpClientService = module.get<HttpClientService>(HttpClientService);
  });

  it('should be defined', () => {
    expect(httpClientService).toBeDefined();
  });

  describe('get', () => {
    it('should make a successful GET request', async () => {
      const url = 'https://example.com/api/data';
      const responseData = { key: 'value' };

      const axiosResponse: AxiosResponse = {
        data: responseData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };

      jest.spyOn(axios, 'request').mockResolvedValueOnce(axiosResponse);

      const result = await httpClientService.get(url);

      expect(result).toEqual(axiosResponse);
      expect(axios.request).toHaveBeenCalledWith({
        method: 'GET',
        url: url,
        data: null,
      });
    });

    it('should handle an error during GET request', async () => {
      const url = 'https://example.com/api/data';
      const errorMessage = 'Error making HTTP request';

      const axiosError: AxiosError = {
        message: errorMessage,
        name: 'AxiosError',
        config: {} as any,
        isAxiosError: true,
        toJSON: jest.fn(),
      };

      jest.spyOn(axios, 'request').mockRejectedValueOnce(axiosError);

      await expect(httpClientService.get(url)).rejects.toThrowError(
        errorMessage,
      );

      expect(axios.request).toHaveBeenCalledWith({
        method: 'GET',
        url: url,
        data: null,
      });
    });

    it('should handle an Error during GET request with response', async () => {
      const url = 'https://example.com/api/data';
      const responseData = { error: 'Not Found' };

      const axiosError = {
        response: {
          data: responseData,
          status: 500,
        },
      };

      jest.spyOn(axios, 'request').mockRejectedValueOnce(axiosError);

      await expect(async () => {
        await httpClientService.get(url);
      }).rejects.toThrowError('Error making HTTP request');

      expect(axios.request).toHaveBeenCalledWith({
        method: 'GET',
        url: url,
        data: null,
      });
    });
  });

  describe('makeRequest', () => {
    it('should make a successful request with provided method, url, and data', async () => {
      const method = 'POST';
      const url = 'https://example.com/api/data';
      const requestData = { key: 'value' };

      const axiosResponse: AxiosResponse = {
        data: requestData,
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {} as any,
      };

      jest.spyOn(axios, 'request').mockResolvedValueOnce(axiosResponse);

      const result = await httpClientService.makeRequest(
        method,
        url,
        requestData,
      );

      expect(result).toEqual(axiosResponse);
      expect(axios.request).toHaveBeenCalledWith({
        method,
        url,
        data: requestData,
      });
    });

    it('should handle an error during request', async () => {
      const method = 'PUT';
      const url = 'https://example.com/api/data';
      const requestData = { key: 'value' };
      const errorMessage = 'Error making HTTP request';

      const axiosError: AxiosError = {
        message: errorMessage,
        name: 'AxiosError',
        config: {} as any,
        isAxiosError: true,
        toJSON: jest.fn(),
      };

      jest.spyOn(axios, 'request').mockRejectedValueOnce(axiosError);

      await expect(
        httpClientService.makeRequest(method, url, requestData),
      ).rejects.toThrowError(errorMessage);

      expect(axios.request).toHaveBeenCalledWith({
        method,
        url,
        data: requestData,
      });
    });
  });
});
