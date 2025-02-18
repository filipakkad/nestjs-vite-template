import { Injectable } from '@nestjs/common';
import { createServer, ViteDevServer } from 'vite';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

@Injectable()
export class ViteFrontendService {
  private viteServer: ViteDevServer | undefined;
  private viteReady: Promise<void>;
  private app: NestExpressApplication | null = null;

  constructor() {
    this.viteReady = this.initializeVite();
  }

  async setApp(app: NestExpressApplication) {
    await this.viteReady; // Ensure Vite is ready before returning
    this.app = app;
    if (this.viteServer) {
      this.app.use(this.viteServer.middlewares);
    }
  }

  private async initializeVite() {
    this.viteServer = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
      root: join(process.cwd(), 'src', 'vite-frontend', 'app'),
    });
  }

  async getViteServer(): Promise<ViteDevServer> {
    await this.viteReady; // Ensure Vite is ready before returning
    if (!this.viteServer) {
      throw new Error('Vite server is not initialized yet.');
    }
    return this.viteServer;
  }

  async onModuleDestroy() {
    await this.viteServer?.close();
  }
}
