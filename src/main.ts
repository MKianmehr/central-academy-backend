import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ["hgbfsdcafgh"],
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
    // secure: true,
    // signed: false,
  }))
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true })
  )

  const config = new DocumentBuilder()
    .setTitle('Central Academy')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('APIS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);
  await app.listen(3000);
}
bootstrap();
