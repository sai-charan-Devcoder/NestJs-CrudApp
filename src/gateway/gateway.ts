import { OnModuleInit } from '@nestjs/common';
import {WebSocketGateway} from '@nestjs/websockets'
import {WebSocketServer,MessageBody,SubscribeMessage} from '@nestjs/websockets'
import {Server} from 'socket.io';

@WebSocketGateway(
    {
     credentials:true,
        origin:'https://localhost:3000' 
      }
    
)
export class MyGateway implements OnModuleInit{
     

    onModuleInit(){
        this.server.on('connection',(socket)=>{
      console.log(socket.id);
      console.log('connected');
        })
      }
    @WebSocketServer()
    server:Server;

   

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body:any){
        console.log(body);
       this.server.emit('onMessage',{
        msg:'Newmessage',
        content:body,
       });
    }

}