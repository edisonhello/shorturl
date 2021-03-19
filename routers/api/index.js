
import Router from 'koa-router';

import { postRecord } from '../../controllers/api/record.js';

// import userRouter from './user.js';

const router = new Router();

// router.use('/user', userRouter.rout)

router.post('/record', async ctx => {
  return postRecord(ctx);
})

export default router;