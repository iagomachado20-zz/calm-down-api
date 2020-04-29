const jwt = require('jsonwebtoken');
import { Router } from 'express';
import User from '../models/user.schema';
import Message from '../models/messages.schemas';
import Category from '../models/category.schemas';

const routerMainApp = Router();

routerMainApp.post('/register', async (req, res) => {

    const { body } = req;

    let user = await User.findOne({ email: body.email });
    
    if (user) res.status(400).send('Este usuário já existe');

    body.password = User.encryptPassword(body.password);

    user = new User(body);

    user.save(error => {

        if (error) res.status(400).json({ message: 'Todos os campos devem ser preenchidos!'});

        res.send(user);

    });

});

routerMainApp.post('/login', async (req, res) => {

    const { body } = req;

    let user = await User.findOne({ email: body.email });
    
    if (!user) res.status(400).json({ message: 'Usuário não existe!' });

    if (!User.isValidPassword(body.password, user.password)) {
        res.status(400).json({ message: 'E-mail ou senha inválidos!' });
    }

    const id = user._id;
    const token = jwt.sign({ id }, 'calmdown', {
        expiresIn: '24h'
    });

    res.status(200).send({
        message: 'Seja bem vindo!',
        token: token,
        user: user
    });

});

routerMainApp.post('/create-message', async (req, res) => {

    const { body } = req;

    let message = await Message.findOne({ image: body.image });
    
    if (message) res.status(400).json({ message: 'Imagem já cadastrada!' });

    message = new Message(body);

    message.save(error => {

        if (error) res.status(400).json({ message: 'Categoria e imagem devem ser preenchidos.'});

        res.send(message);

    });

});

routerMainApp.post('/create-category', async (req, res) => {

    const { body } = req;

    let category = await Category.findOne({ title: body.title });
    
    if (category) res.status(400).json({ message: 'Category já existente!' });

    category = new Category(body);

    category.save(error => {

        if (error) res.status(400).json({ message: 'Título da categoria deve ser preenchido'});

        res.send(category);

    });

});

export default routerMainApp;