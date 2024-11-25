import {  Controller, Get, HttpCode,  Param,  Put, Query, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotifyEmailRepository } from './notify-email.repository';
import { NotifyEmail } from './entities/notify-email.entity';



@Controller()
@UseInterceptors(LoggingInterceptor)
export class NotifyEmailController {

  constructor(
    private readonly emailRepository: NotifyEmailRepository
  ) {}


  @Get('/notification-email')
  @ApiOperation({ summary: 'Get all email addresses for notification' })
  @ApiResponse({  status: 200,  type: [NotifyEmail] })
  async getEmails() {
    return this.emailRepository.getEmails()
  }


  @Put('notification-email')
  @HttpCode(200)
  @ApiOperation({ summary: 'Add email for notification' })
  @ApiResponse({  status: 200, type: NotifyEmail })
  async addEmail(@Query('email') email: string) {
    return this.emailRepository.addEmail(email)
  }

}
