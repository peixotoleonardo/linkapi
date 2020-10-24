import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './order.entity';
import { OrderSerivce } from './order.service';

@Controller('orders')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderSerivce) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Order],
  })
  @ApiOperation({ summary: 'Returns the total daily sales amount' })
  async show(): Promise<Order[]> {
    return this.orderService.showAggregateOrder();
  }
}
