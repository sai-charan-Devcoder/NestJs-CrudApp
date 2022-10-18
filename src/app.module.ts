import { GatewayModule } from './gateway/gateway.module';
import { JwtModule } from '@nestjs/jwt';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    EmployeeModule, GatewayModule,      
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
 }),
 
 TypeOrmModule.forFeature([User]),
 JwtModule.register({

  secret:'secret',
   signOptions:{expiresIn:'60s'}

 }),
 EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
