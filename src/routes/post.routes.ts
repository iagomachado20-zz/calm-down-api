import { Router } from 'express';

import authGuard from '../middlewares/auth.middleware';
import Post from '../models/post.schemas';

const postRouter = Router();

postRouter.post('/create', authGuard, async (req: any, res) => {

    const { body, userId } = req;
    const { idCommentPost } = body;

    let post = new Post({
        ...body,
        author: userId,
        isComment: idCommentPost ? true : false
    });


    post.save(async (error) => {

        if (error) res.status(400).json({ message: 'Houve um erro ao postar sua mensagem'});

        if (idCommentPost) {

            const query = {_id: idCommentPost};

            let docPost =  await Post.findOneAndUpdate(query, {$push: { comments: post._id }})

            if (docPost) {
                docPost.save();
            }
            

        }

        res.send(post);

    });
    

});

postRouter.get('/list-posts', authGuard, async (_, res) => {

    Post.find({isComment: false})
    .populate('author')
    .populate('comments')
    .exec((err, docs) => {
            
        if (err) res.status(400).json(err);

        res.send(docs);

    });

});

export default postRouter;