import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlingModule } from 'src/bling/bling.module';
import { Order } from './order.entity';
import { OrderSerivce } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    BlingModule,
  ],
  providers: [
    OrderSerivce,
  ],
  exports: [
    OrderSerivce,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
