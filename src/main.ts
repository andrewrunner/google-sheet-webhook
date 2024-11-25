import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './configs/initSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
