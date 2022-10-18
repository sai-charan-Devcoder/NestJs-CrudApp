import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


   app.use(cookieParser());

  app.enableCors(
    {
      credentials:true,
      origin:'https://localhost:3000' 
    }
  )

//swagger module
  const config = new DocumentBuilder()
    .setTitle('crud API')
    .setDescription('The crud API description')
    .setVersion('1.0')
    .addTag('Employee')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap();
