import { Module } from '@nestjs/common';
import { WebhookController } from './controllers/webhook/webhook.controller';
import { BullModule } from '@nestjs/bull';
import { OrderModule } from 'src/order/order.module';
import { DealConsumer } from './consumers/deal.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'pipedrive',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: +configService.get('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
    OrderModule,
  ],
  controllers: [WebhookController],
  providers: [DealConsumer]
})
export class PipedriveModule {}
