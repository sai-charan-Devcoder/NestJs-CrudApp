import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppService } from './../app.service';
import { Employee } from './employee.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { User } from 'src/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({

      secret:'secret',
       signOptions:{expiresIn:'60s'}
    
     }),
  ],
  providers: [EmployeeService,AppService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
