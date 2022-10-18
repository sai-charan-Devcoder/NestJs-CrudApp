import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ApiBody } from '@nestjs/swagger';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService) { }

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }


  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOneBy(condition);   //FindOneBy method will take any of entity attribute to check for existance.
  }

  // async user(@Req() request: Request) {

   

  // }

  async checkUser(@Req() request: Request){
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        return {msg:"unauthorized access"};
      }

      const user = await this.findOne({ id: data['id'] });


      const { password, ...result } = user;

      return result;

    }
    catch (e) {
      console.log(e);
      return {msg:"session Expired/Invalid"};
    }
  }


}
