///CONTROLADOOR
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from "../../../services/users"; 

const userService = new UserService(); //esto porque tengo exportada la clase no la función. reza malena q ande

@Controller('signup')
export class SignupController {
  //logger: any; //f el consolelog.
  @Post()
  async createUser(@Body('email') email: string, @Body('password') password: string, @Res() res: Response) {
    
      const useradd = await userService.createUser({ email, password }); 
      return res.status(HttpStatus.CREATED).json(useradd);
   
  }
}

