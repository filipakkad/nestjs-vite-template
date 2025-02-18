import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ViteDevModeMiddleware } from './vite-dev-mode-middleware.service';
import { ViteFrontendService } from './vite-frontend.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { isProduction } from '../helpers';

@Module({
  providers: [ViteFrontendService],
  imports: isProduction()
    ? [
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, 'app', 'dist'),
        }),
      ]
    : [],
})
export class ViteFrontendModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if (!isProduction()) {
      consumer.apply(ViteDevModeMiddleware).exclude('/api/(.*)').forRoutes('*');
    }
  }
}
