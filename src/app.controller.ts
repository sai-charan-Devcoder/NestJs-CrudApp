import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {Response,Request} from 'express'
import * as cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';
import { appendFile } from 'fs';
// somewhere in your initialization file

// somewhere in your initialization file


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService
    ) {}

@Post('register')
async register(
  @Body('name') name:string,
  @Body('email') email:string,
  @Body('password') password:string
  ){

  const hashedPassword=await bcrypt.hash(password,12); 
  
  const user=this.appService.create({name,email,password:hashedPassword});

 delete (await user).password;

  return user;

}


//for login
@Post('login')
async login(
  @Body('email') email: string,
  @Body('password') password:string,
  @Res({passthrough:true}) response:Response
){

  const user=await this.appService.findOne({email});

  if(!user){
    throw new BadRequestException('invalid Credentials');
  }

  if(!await bcrypt.compare(password,user.password)){
    throw new BadRequestException('Invalid credentials');
  }

  const jwt=await this.jwtService.signAsync({id:user.id});   //create token 

 
  response.cookie('jwt',jwt,{httpOnly:true});

   return {
    message:"success"
   }

}



//Get the authenticated user

// async user(@Req() request:Request){

//   try{
// const cookie=request.cookies['jwt'];

// const data=await this.jwtService.verifyAsync(cookie);

// if(!data){
//   throw new UnauthorizedException;
// }

// const user=await this.appService.findOne({id:data['id']});


// const {password,...result}=user;

// return result;

//   }
//   catch(e){
// throw new UnauthorizedException;
//   }

// }
@Get('user')
async user(@Req() request:Request){
const ele=this.appService.checkUser(request);
return ele;
}




@Post('logout')
async logout( @Res({passthrough:true}) response:Response){
  response.clearCookie('jwt');

  return{msg:"user loged out"};

}


 
}



