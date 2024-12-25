import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SimpleMiddleware } from './common/middleware/simple.middleware';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TransformInterceptor } from './transform/transform.interceptor';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(SimpleMiddleware); //全局添加中间件
  // app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
