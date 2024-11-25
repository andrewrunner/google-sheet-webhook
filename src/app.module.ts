import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeORMConfig } from './configs/getTypeORMConfig';
import { RowsModule } from './row/rows.module';
import { NotifyEmailModule } from './notify-email/notify-email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync(getTypeORMConfig()),

    RowsModule, NotifyEmailModule,
  ]
})
export class AppModule {}
