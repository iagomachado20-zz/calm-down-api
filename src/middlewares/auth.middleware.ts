const jwt = require('jsonwebtoken');

const authGuard = (req ?: any, res ?: any, next ?: any) => {

    try  {
        let token = req.headers['x-access-token'] || req.headers.authorization;

        if (!token) res.send(401).json({message: 'Token precisa ser fornecido'});

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }

        if (token) {
            jwt.verify(token, 'calmdown', (error: any, decoded: any) => {

                if (error) res.status(401).send({ message: 'Token inválido' })
                req.userId = decoded.id;
                next();
            });
        } else {
            return res.status(401).json({
                message: 'Auth token is not supplied'
            });
        }
    } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
    }

};

export default authGuard;