import { Schema, model } from 'mongoose';

export interface UserModel {
    _id ?: string;
    name: string;
    photo: string;
    email: string;
    password: string;
    encryptPassword: Function
    isValidPassword: Function
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

UserSchema.static('encryptPassword', (password) => {

    const bcrypt = require('bcrypt');
    return bcrypt.hashSync(password, 10);

});


UserSchema.static('isValidPassword', (password, hash) => {

    const bcrypt = require('bcrypt');
    return bcrypt.compareSync(password, hash);

});


const User = model('User', UserSchema);

export default User;
