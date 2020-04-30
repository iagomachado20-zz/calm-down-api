import { UserModel } from './user.schemas';
import { Schema, model } from 'mongoose';

export interface PostModel {
    postText: string;
    date: Date;
    author: UserModel;
    comments: PostModel[]
}

const PostSchema = new Schema<any>({
    postText: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    comments: [
        { type: Schema.Types.ObjectId, ref: 'Post' }
    ]
});


const Post = model('Post', PostSchema);

export default Post;
