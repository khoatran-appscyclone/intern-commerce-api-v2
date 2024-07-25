import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronjobService {

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    // console.log('Called every 30 seconds');
  }
}
