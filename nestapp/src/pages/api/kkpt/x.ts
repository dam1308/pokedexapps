
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from 'src/helpers/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //console.log('Middleware');
    
    // Verificar si el usuario está autenticado con la cookie de sesión válida
    const jwt = req.cookies['user'];
   // console.log('jwt', jwt);

    //console.log('HOLAAAAA');
    if (verifyJWT(jwt)) {
      next();
    } else {
      return res.status(401).json({ success: false, message: 'ups' });

    }
  }
}
