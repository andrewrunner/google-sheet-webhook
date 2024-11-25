import { Module } from '@nestjs/common';
import { RowsRepository } from './row.repository';
import { RowsController } from './rows.controller';
import { NotifyEmailRepository } from 'src/notify-email/notify-email.repository';
import { NotifyEmailModule } from 'src/notify-email/notify-email.module';

@Module({
  imports: [ NotifyEmailModule ],
  providers: [RowsRepository, NotifyEmailRepository ],
  controllers: [ RowsController  ],
})
export class RowsModule {}
