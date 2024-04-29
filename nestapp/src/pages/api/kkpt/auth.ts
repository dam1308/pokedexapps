import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../../services/users';
import { signJWT } from '../../../helpers/jwt';

const userService = new UserService(); //lo mismo que en users.ts de abajo
@Controller('login')
export class LoginController {
  @Post()
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      const user = await userService.authenticateUser({ email, password });
      const jwt = signJWT(user);
      
      // funciona sin la del redirectwc. ?? VEr DPS
      //return redirectWithCookies('/admin', [{ name: 'user', value: jwt, maxAge: 60 * 60 * 24 }])
      res.cookie('user', jwt, { maxAge: 60 * 60 * 24, httpOnly: true });
      
      // rsp.
      return res.status(200).json({ success: true });
    } catch (error) {
      // Enviar una respuesta JSON indicando que hubo un error en la autenticación
      
      return res.status(401).json({ success: false, message: 'ups' }); 
    }
  }
}

