import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { NotifyEmail } from 'src/notify-email/entities/notify-email.entity';

import { Row } from 'src/row/entities/row.entity';

export const getTypeORMConfig = ():TypeOrmModuleAsyncOptions => ({
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        
        synchronize: true,
        connectTimeoutMS:10000,
        extra: {
            ssl: {
                rejectUnauthorized: false, // turn on SSL, but without checing certificates (`prefer`)
            },
        },

        
        entities: [Row, NotifyEmail],
       
        //useUnifiedTopology: true,
        // useNewUrlParser: true,
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
})