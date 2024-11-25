import { Module } from '@nestjs/common';
import { NotifyEmailRepository } from './notify-email.repository';
import { NotifyEmailController } from './notify-email.controller';

@Module({
  providers: [NotifyEmailRepository ],
  controllers: [ NotifyEmailController ],
  exports: [NotifyEmailRepository]
})
export class NotifyEmailModule {}
