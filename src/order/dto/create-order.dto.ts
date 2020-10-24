import { OrderStatus } from '../order-status.enum';

export class CreateOrderDto {
  title: string;
  client: string;
  idTransaction: number;
  value: number;
  currency: string;
  status: OrderStatus;
  date: Date;
}
