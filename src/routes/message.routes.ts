import { Router } from 'express';
import Message from '../models/messages.schemas';
import Category from '../models/category.schemas';

const messageRouter = Router();

messageRouter.post('/create-message', async (req, res) => {

    const { body } = req;

    let message = await Message.findOne({ image: body.image });
    
    if (message) res.status(400).json({ message: 'Imagem já cadastrada!' });

    message = new Message(body);

    message.save(error => {

        if (error) res.status(400).json({ message: 'Categoria e imagem devem ser preenchidos.'});

        res.send(message);

    });

});

messageRouter.get('/list-messages', async (_, res) => { 


    const allCategories = await Category.find().lean();

    await Promise.all(allCategories.map(async (category: any) => {

        await Message.find({ category: category._id })
        .then(messages => category.messages = messages);

        return category;

    }));

    res.json(allCategories);


});

messageRouter.post('/create-category', async (req, res) => {

    const { body } = req;

    let category = await Category.findOne({ title: body.title });
    
    if (category) res.status(400).json({ message: 'Category já existente!' });

    category = new Category(body);

    category.save(error => {

        if (error) res.status(400).json({ message: 'Título da categoria deve ser preenchido'});

        res.send(category);

    });

});

export default messageRouter;