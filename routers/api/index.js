
import Router from 'koa-router';

import createNew from '../../controllers/api/createNew.js';

// import userRouter from './user.js';

const router = new Router();

// router.use('/user', userRouter.rout)

router.post('/createNew', async ctx => {
  return createNew(ctx);
})

export default router;