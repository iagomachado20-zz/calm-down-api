import { DataBase } from './db/connection';
import express from "express";
import routerMainApp from "./routes/routes-app";

import mongoose from 'mongoose';

const app = express();

mongoose.connect(DataBase.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(routerMainApp);

app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000');
});
  