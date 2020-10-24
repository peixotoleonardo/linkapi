import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import axios from 'axios';
import { Order } from 'src/order/order.entity';
import { make } from './request/create-order-body-request';

@Injectable()
export class BlingService {
  private readonly client: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.client = axios.create({
      baseURL: this.configService.get('bling.baseUrl'),
    });
  }

  async createOrder(order: Order): Promise<void> {
    await this.client.post('/pedido/json', make(
      this.configService.get('bling.auth.apiKey'),
      order
    ), {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      params: make(this.configService.get('bling.auth.apiKey'), order)
    });
  }
}
