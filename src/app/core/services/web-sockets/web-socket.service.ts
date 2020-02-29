import { AuthService } from '../authentication/auth.service';
import { DataPacket } from 'src/app/core/models/data-packet';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../../models/message';
import { MessageType } from '../../models/enums/MessageType';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private ws: WebSocket;
  private recivedMessages: Subject<Message>;

  constructor(private authService: AuthService) {
    this.recivedMessages = new Subject<Message>();
  }

  public create(url: string) {
    this.ws = new WebSocket(url)
    this.ws.onopen = () => console.log("Client Connected");
    this.ws.onclose = () => console.log("Client Disconencted");
    this.ws.onmessage = (event: any) => {

      const dataPacket: DataPacket = JSON.parse(event.data);
      
      var type;
      if(dataPacket.eventType == 'on-message'){
        type = MessageType.message;
      }
      else if(dataPacket.eventType == 'on-image'){
        type = MessageType.image
      }

      const message: Message = {
        type: type,
        message: dataPacket.eventData.messageId,
        sentAt: dataPacket.eventData.timestamp,
        content: dataPacket.eventData.content,
        user: {
          userId: dataPacket.eventData.senderId,
          username: dataPacket.eventData.username

          
        }
      }

      this.recivedMessages.next(message);
    };
    this.ws.onerror = (event) => console.log(event);
  }

  public send(dataPacket: DataPacket) {
    var setTimeoutId = setTimeout(() => {
      try {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(dataPacket));
          clearTimeout(setTimeoutId);
        }
      }
      catch (err) {
        console.error("connection not established");
        console.error(err);
      }
    }, 100)
  }

  public close() {
    this.ws.close(1000, 'The user disconnected')
  }

  public receivedMessages() {
    return this.recivedMessages.asObservable();
  }

  public isReady(): boolean {
    return this.ws.readyState == WebSocket.OPEN
  }

}

