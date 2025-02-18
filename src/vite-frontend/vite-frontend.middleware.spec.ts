import { ViteDevModeMiddleware } from './vite-dev-mode-middleware.service';

describe('ViteFrontendMiddleware', () => {
  it('should be defined', () => {
    expect(new ViteDevModeMiddleware()).toBeDefined();
  });
});
