import { Router } from 'express';

import userRouter from './user.routes';
import messageRouter from './message.routes';
import postRouter from './post.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/messages', messageRouter);
router.use('/post', postRouter);

export default router;