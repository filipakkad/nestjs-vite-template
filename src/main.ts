import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ViteFrontendService } from './vite-frontend/vite-frontend.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { isProduction } from './helpers';

async function bootstrap() {
  console.log(process.env.NODE_ENV);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (!isProduction()) {
    const viteService = app.get(ViteFrontendService);
    await viteService.setApp(app);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
