import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ViteFrontendModule } from './vite-frontend/vite-frontend.module';

@Module({
  imports: [ViteFrontendModule],
  providers: [AppService],
})
export class AppModule {}
