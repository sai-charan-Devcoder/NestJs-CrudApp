import { AppService } from './../../app.service';
import { Employee } from './../employee.entity';
import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Post,Put, Delete, Body, Param } from  '@nestjs/common';
import {Request} from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('employee')
export class EmployeeController {

    constructor(private employeeService: EmployeeService,
      private jwtService: JwtService,
      public appService :AppService){}
 
    @Get()
    async index(@Req() request:Request): Promise<Employee[]> {
      
      // const ele=this.appService.checkUser(request);
        

      try {
        const cookie = request.cookies['jwt'];
  
        const data = await this.jwtService.verifyAsync(cookie);
  
        if (!data) {
          throw new UnauthorizedException;
        }
  
        const user = await this.appService.findOne({ id: data['id'] });
  
  
        // const { password, ...result } = user;
  
        return this.employeeService.findAll();
  
      }
      catch (e) {
       
        throw new UnauthorizedException;
      }

        
       
      }
  //creating a new Employee
      @Post('create')
    async create(@Body() employeeData: Employee): Promise<any> {
      return this.employeeService.create(employeeData);
      
    } 

    //Updating the Employee details
    @Put(':id/update')
    async update(@Param('id') id, @Body() employeeData: Employee,@Req() request:Request): Promise<any> {
     
      try {
        const cookie = request.cookies['jwt'];
  
        const data = await this.jwtService.verifyAsync(cookie);
  
        if (!data) {
          throw new UnauthorizedException;
        }
  
        const user = await this.appService.findOne({ id: data['id'] });
  
  
        // const { password, ...result } = user;
  
        
        employeeData.id = Number(id);
        console.log('Update #' + employeeData.id)
        return this.employeeService.update(employeeData);
  
      }
      catch (e) {
       
        throw new UnauthorizedException;
      }





    } 
    
    //delete particular
    @Delete(':id/delete')
    async delete(@Param('id') id,@Req() request:Request): Promise<any> {

      try {
        const cookie = request.cookies['jwt'];
  
        const data = await this.jwtService.verifyAsync(cookie);
  
        if (!data) {
          throw new UnauthorizedException;
        }
  
        const user = await this.appService.findOne({ id: data['id'] });
  
  
        // const { password, ...result } = user;
  
        return this.employeeService.delete(id);
      
      }
      catch (e) {
       
        throw new UnauthorizedException;
      }


      
    
    }  
    
}
