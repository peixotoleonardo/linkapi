import { Module } from '@nestjs/common';
import { BlingModule } from './bling/bling.module';
import { PipedriveModule } from './pipedrive/pipedrive.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import bling from './config/bling';
import database from './config/database';
import redis from './config/redis';
import app from './config/app';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [bling, database, redis, app],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('database.host'),
        port: +configService.get<number>('database.port'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
        useUnifiedTopology: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PipedriveModule,
    BlingModule,
    OrderModule,
  ],
})
export class AppModule {}
