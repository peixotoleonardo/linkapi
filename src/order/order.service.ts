import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlingService } from 'src/bling/bling.service';
import { MongoRepository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './order.entity';

@Injectable()
export class OrderSerivce {
  constructor(
    @InjectRepository(Order) private readonly ordersRepository: MongoRepository<Order>,
    private readonly blingSerivce: BlingService
  ) { }

  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    if (createOrderDto.status === OrderStatus.won) {
      const order = this.ordersRepository.create(createOrderDto);

      await this.ordersRepository.save(order);

      await this.blingSerivce.createOrder(order);
    }
  }

  async showAggregateOrder(): Promise<Order[]> {
    return await this.ordersRepository.aggregateEntity([
      {
        $group: {
          _id: {
            currency: '$currency',
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' }
          },
          value: { $sum: '$value' },
          currency: { $first: '$currency' },
          date: { $first: '$date' }
        }
      },
      {
        $project: {
          _id: false,
          value: true,
          currency: true,
          date: { $dateToString: { format: '%d/%m/%Y', date: '$date' } }
        }
      }
    ]).toArray();
  }
}
