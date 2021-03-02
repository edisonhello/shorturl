
import 'dotenv';
import Koa from 'koa';
import koaBody from 'koa-body';

import newLogger from './common/logger.js';
import { initDB } from './db/index.js';
import router from './routers/index.js';

const { info } = newLogger('index');

await initDB();

const app = new Koa();

app.use(koaBody());
app.use(router.routes(), router.allowedMethods());

const port = process.env.PORT || 3000
app.listen(port, () => {
  info(`Server starts running at port ${port}`);
});