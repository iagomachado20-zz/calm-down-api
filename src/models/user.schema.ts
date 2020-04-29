import { Schema, model } from 'mongoose';

const UserSchema = Schema({
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
