import { Schema, Document, model } from 'mongoose';
import { response } from 'express';

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
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


//Methods

UserSchema.methods.registerUser = async function(user: IUserSchema) {
    await this.create(user)
    .then(response => {
        return response.json('Usuário criado');
    }, _error => {
        return response.status(400).send('Error ao criar usuário');
    });
}

interface IUserSchema extends Document {
    name: string;
    email: string;
    photo: string;
    password: string;
}

export default model('User', UserSchema)