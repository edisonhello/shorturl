
import path from 'path';
import { fileURLToPath } from 'url';

import Router from 'koa-router';
import koaSend from 'koa-send';

import newLogger from '../common/logger.js';
import apiRoute from './api/index.js';
import shortUrlRouter from './shortUrl.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { debug, info } = newLogger('router');

const router = new Router();

router.use('/api', apiRoute.routes());
router.use(shortUrlRouter);

const rootSetting = { root: path.resolve(__dirname, '..', 'public') };
router.use('/dist/(.*)', async ctx => {
  return koaSend(ctx, ctx.request.url, rootSetting);
});

router.use(async ctx => {
  return koaSend(ctx, 'index.html', rootSetting);
});

router.all("(.*)", (_, next) => next());

export default router;