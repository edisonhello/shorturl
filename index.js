
import Koa from 'koa';
import 'dotenv';

import newLogger from './common/logger.js';
import router from './routers/index.js';

const { info } = newLogger('index');

const app = new Koa();

app.use(router.routes(), router.allowedMethods());

const port = process.env.PORT || 3000
app.listen(port, () => {
  info(`Server starts running at port ${port}`);
});