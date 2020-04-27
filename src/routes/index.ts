import { Router } from 'express';
import routerMainApp from './routes-app';

const routes = Router();

routes.use('/', routerMainApp);

export default routes;