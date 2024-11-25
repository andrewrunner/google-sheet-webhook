import { Body, Controller, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { EditedRowDto } from './dto/edited-row.dto';
import { RowsRepository } from './row.repository';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Row } from './entities/row.entity';
import * as sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { NotifyEmailRepository } from 'src/notify-email/notify-email.repository';


@Controller()
@UseInterceptors(LoggingInterceptor)
export class RowsController {

  constructor(
    private readonly rowsRepository: RowsRepository,
    private readonly notifyEmailRepository: NotifyEmailRepository,
    private readonly configService: ConfigService
  ) {}


  @Get('/')
  @ApiOperation({ summary: 'Get all rows' })
  @ApiResponse({  status: 200,  type: [Row] })
  async getRows() {

    return this.rowsRepository.getRows()
  }


  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get row by id' })
  @ApiResponse({  status: 200, type: Row })
  async getRow(@Param('id') id: string) {

    return this.rowsRepository.getRow(+id)
  }


  @Post('/webhook')
  @HttpCode(200)
  @ApiOperation({ summary: 'Webhoock for google sheet. Save changes of table' })
  async saveRows(@Body() dto:EditedRowDto) {

    await this.rowsRepository.createRow(dto);


    const rowsCount = await this.rowsRepository.count();
    if((rowsCount % 10) !== 0) 
      return;
    
    const lastTenRows = await this.rowsRepository.find({
      order: {
        id: "DESC", 
      },
      take: 10, 
    });

    const notifyEmails = await this.notifyEmailRepository.getEmails();




    const emailApiKey = this.configService.get('SENDGRID_API_KEY');
    const emailFrom =  this.configService.get('SENDGRID_EMAIL_FROM');

    let message = "";
    for(const row of lastTenRows) {
      const dateTimeStr = (new Date(row.timestamp)).toLocaleString();
        message += `${dateTimeStr} \t ${row.orderId} \t ${row.customer} \t ${row.orderDate} \t ${row.status} <br/>`
    }

    sgMail.setApiKey(emailApiKey);

    for(const item of notifyEmails) {
        try {
          await sgMail.send({
            to: item.email,
            from: emailFrom, 
            subject: 'Останні 10 строчок з історії',
            html:message,
          });

          console.log(`${item.email} have been notificated`)
        } catch(e) {
          console.error(e)
        }
    }

  }

}
