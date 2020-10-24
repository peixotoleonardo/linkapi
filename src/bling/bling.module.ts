import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlingService } from './bling.service';

@Module({
  imports: [ConfigModule],
  providers: [BlingService],
  exports: [BlingService],
})
export class BlingModule {}
