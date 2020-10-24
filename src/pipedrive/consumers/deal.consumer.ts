import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OrderSerivce } from 'src/order/order.service';

@Processor('pipedrive')
export class DealConsumer {
  constructor(private readonly orderSerivce: OrderSerivce) {}

  @Process('deal')
  async handleDeal(job: Job): Promise<void> {
    const {
      current: {
        status,
        value,
        currency,
        title,
        id: idTransaction,
        person_name: client,
        won_time: date
      }
    } = job.data;

    await this.orderSerivce.createOrder({
      client,
      idTransaction,
      status,
      value,
      currency,
      title,
      date,
    });
  }
}
