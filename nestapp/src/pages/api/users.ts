///CONTROLADOOR
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from "../../services/users"; 

const userService = new UserService(); //esto porque tengo exportada la clase no la función.

@Controller('signup')
export class SignupController {
  @Post()
  async createUser(@Body('email') email: string, @Body('password') password: string, @Res() res: Response) {
    try {
      await userService.createUser({ email, password }); 
      return res.redirect('/login');
    } catch (error) {
      return res.redirect('/signup?error=true');
    }
  }
}
