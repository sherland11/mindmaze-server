import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200',  'https://yourdomain.com']
  app.enableCors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  })
  await app.listen(3000);
}
bootstrap();
