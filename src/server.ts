import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import { DataBase } from './db/connection';
import routerMainApp from "./routes/routes-app";
import ConfigApp from './utils/configs.app';

const app = express();
const config = new ConfigApp(3000);

mongoose.connect(DataBase.connectionString, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(express.json());
app.use(routerMainApp);

app.listen(process.env.PORT || config.normalizePort(), () => {
    console.log('Aplicação rodando na porta 3000');
});
  