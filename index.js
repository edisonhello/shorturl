
import Koa from 'koa';
import serve from 'koa-static';
import 'dotenv';
import newLogger from './common/logger.js';

const { info } = newLogger('index');

const app = new Koa();

app.use(serve('./public', { index: "index.html" }));

const port = process.env.PORT || 3000
app.listen(port, () => {
  info(`Server starts running at port ${port}`);
});