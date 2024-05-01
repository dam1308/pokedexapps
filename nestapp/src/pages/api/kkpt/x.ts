
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from 'src/helpers/jwt';
const jwtService = new JwtService();
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    const jwt = req.cookies['user'];
   
    if (jwtService.verifyJWT(jwt)) {
      next();
    } else {
      return res.status(401).json({ success: false, message: 'ups' });

    }
  }
}
