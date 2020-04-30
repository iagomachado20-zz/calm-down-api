import { Router } from 'express';
import Post from '../models/post.schemas';

const postRouter = Router();

postRouter.post('/create', async (req, _) => {

    const { body } = req;

    let post = new Post(body);

    post.save(_ => {



    });

});

export default postRouter;