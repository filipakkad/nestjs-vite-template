import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { ViteFrontendService } from './vite-frontend.service';

@Injectable()
export class ViteDevModeMiddleware implements NestMiddleware {
  constructor(private viteFrontendService: ViteFrontendService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;

    if (url.startsWith('/api')) {
      return next();
    }

    try {
      const viteServer = await this.viteFrontendService.getViteServer();

      await new Promise<void>((resolve, reject) => {
        viteServer.middlewares(req, res, (err: any) => {
          if (err) reject(err);
          resolve();
        });
      });

      if (!res.writableEnded) {
        const indexHtml = await readFile(
          join(process.cwd(), 'src/vite-frontend/app/index.html'),
          'utf-8',
        );

        const transformedHtml = await viteServer.transformIndexHtml(
          url,
          indexHtml,
        );
        res
          .status(200)
          .set({ 'Content-Type': 'text/html' })
          .end(transformedHtml);
      }
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }
}
