import { Router } from 'express';
import Post from '../models/post.schemas';

const postRouter = Router();

postRouter.post('/create', async (req,res) => {

    const { body } = req;

    let post = new Post(body);

    post.save(err => {



    });

});

export default postRouter;