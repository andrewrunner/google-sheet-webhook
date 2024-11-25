import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export function initSwagger(app:INestApplication<any>) {

    const config = new DocumentBuilder()
        .setTitle('Orders history')
        .setDescription('Hisotry of orders from google sheet')
        .setVersion('1.0')
        .build();
    
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-docs', app, documentFactory);
}