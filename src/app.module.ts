import { Module } from '@nestjs/common';
import { ViteFrontendModule } from './vite-frontend/vite-frontend.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ViteFrontendModule, ApiModule],
})
export class AppModule {}
