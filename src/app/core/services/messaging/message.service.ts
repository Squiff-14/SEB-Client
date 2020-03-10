import { RoomService } from './../rooms/room.service';
import { MessageType } from './../../models/enums/MessageType';
import { Message } from './../../models/message';
import { DataPacket } from './../../models/data-packet';
import { SubjectRoom } from '../../models/subject-room';
import { WebSocketService } from './../web-sockets/web-socket.service';
import { User } from 'src/app/core/models/User';
import { MessageHistory } from '../../models/message-history';
import { AuthService } from '../authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private observableRooms: SubjectRoom[] = [];

  constructor(private http: HttpClient, private authService: AuthService,
    private wsService: WebSocketService, private roomService: RoomService) {

      this.roomService.getRooms("").subscribe({
        next: res => {
          res.forEach(room =>
            this.observableRooms.push({
              roomId: room.roomId,
              messages: new Subject<Message>()
            }))
        },
        error: err => console.log(err)
      });

    // React to dataPackets received from the subscription
    this.wsService.dataPackets().subscribe({
      next: packet => {

        // Find the correct room to emit the newly created message. 
        let roomObservable = this.observableRooms.find(room => room.roomId === packet.eventData.roomId);

        //Convert the dataPacket to a message type and emit on the observable stream
        if (roomObservable) {
          let message = {
            type: (packet.eventType == 'on-join-room' || packet.eventType == 'on-message' || packet.eventType == 'on-room') ? MessageType.message : MessageType.image,
            message: packet.eventData.messageId,
            sentAt: packet.eventData.timestamp,
            content: packet.eventData.content,
            user: { userId: packet.eventData.senderId, username: packet.eventData.username }
          }
          roomObservable.messages.next(message);
        }
      },
      error: err => console.log(err)
    });
  }

  // Solution to new room issue
  // If the room does not exist in the object it will be because it has only just been
  // created. 
  // The endpoint to rerieve a users rooms does not yet return the new room because the 
  // websocket event of "on-join-room has not yet saved the UserRoom link in the database"
  public getObservableRoom(roomId: number) {
    if (!this.observableRooms.find(room => room.roomId == roomId)) {
      this.observableRooms.push({
        roomId: roomId,
        messages: new Subject<Message>()
      });
    }
    var room = this.observableRooms.find(room => room.roomId == roomId);
    return room;
  }
  
  // Retrives all message history for a room since the user joined.
  // Can also be used to load history in chunks with the infinite scroll
  public getMessageHistory(roomId: number, before: any, take: number) {
    const user: User = this.authService.currentUser();
    return this.http.get<MessageHistory>(`/Message/${roomId}/history/${user.userId}?before=${before}&take=${take}`);
  }


}


