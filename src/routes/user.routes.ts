const jwt = require('jsonwebtoken');
import { Router } from 'express';
import User from '../models/user.schemas';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {

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

userRouter.post('/login', async (req, res) => {

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

export default userRouter;