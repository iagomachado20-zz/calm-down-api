import express from "express";
import routerMainApp from "./routes/routes-app";
import ConnectionDB from "./db/connection";

const app = express();

app.use(express.json());
app.use(routerMainApp);

//DB
const db = new ConnectionDB();
db.connect();

app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000');
});
  