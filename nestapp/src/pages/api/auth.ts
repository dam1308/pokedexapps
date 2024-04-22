import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../../services/users';
import { signJWT } from '../../helpers/jwt';
const userService = new UserService();
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
      
      // Establecer la cookie en la respuesta
      res.cookie('user', jwt, { maxAge: 60 * 60 * 24, httpOnly: true });
      
      // Enviar una respuesta JSON indicando que la autenticación fue exitosa
      return res.status(200).json({ success: true });
    } catch (error) {
      // Enviar una respuesta JSON indicando que hubo un error en la autenticación
      return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
  }
}
