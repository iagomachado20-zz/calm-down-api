import { Schema, model, Document, Model } from 'mongoose';

export interface UserModel extends Document {
    _id : string;
    name: string;
    photo: string;
    email: string;
    password: string;
}

export interface IUserModel extends Model<UserModel> {
    encryptPassword(password: string): void;
    isValidPassword(password: string, hash: string): boolean;
}

const UserSchema = new Schema<UserModel>({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: Buffer,
        default: ''
    },
    email: {
        type: String,
        required: true,
        email: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 10
    }
});

UserSchema.static('encryptPassword', (password: string) => {

    const bcrypt = require('bcrypt');
    return bcrypt.hashSync(password, 10);

});


UserSchema.static('isValidPassword', (password: string, hash: string) => {

    const bcrypt = require('bcrypt');
    return bcrypt.compareSync(password, hash);

});


const User: IUserModel = model<UserModel, IUserModel>('User', UserSchema);

export default User;
