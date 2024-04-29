
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Verificar si el usuario está autenticado con la cookie de sesión válida
    const jwt = req.cookies['user']; 
        console.log('jwt', jwt);

        console.log('HOLAAAAA');
    if (jwt) {
      next();
    } else {
        res.redirect('/login');
      
    }
  }
}
