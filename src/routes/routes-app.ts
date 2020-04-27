import { Router } from 'express';

import UserSchema from '../models/user.schema';

const routerMainApp = Router();

routerMainApp.get('/register', UserSchema.registerUser());

export default routerMainApp;