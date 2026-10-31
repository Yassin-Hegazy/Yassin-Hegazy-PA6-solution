import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // The Next.js frontend runs on port 3001 and calls this API from the browser.
  app.enableCors({ origin: 'http://localhost:3001' });
  await app.listen(3000);
}
bootstrap();
