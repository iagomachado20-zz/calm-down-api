import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    image: {
        type: String,
        required: true
    }
});


const Message = model('Message', MessageSchema);

export default Message;
