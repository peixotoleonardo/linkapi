import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';

@Controller('webhooks')
@ApiTags('pipedrive')
export class WebhookController {
  constructor(@InjectQueue('pipedrive') private readonly pipedriveQueue: Queue) {}

  @Post('/deal')
  @ApiOperation({ summary: 'Receives deal-related events and forwards them to the processing queue' })
  async webhook(@Body() data: any) {
    await this.pipedriveQueue.add('deal', data);
  }
}
