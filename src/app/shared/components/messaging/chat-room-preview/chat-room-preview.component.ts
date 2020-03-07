import { Room } from './../../../../core/models/Room';
import { SubjectRoom } from './../../../../core/models/subject-room';
import { Message } from './../../../../core/models/message';
import { Observable, Subject, concat } from 'rxjs';
import { MessageService } from './../../../../core/services/messaging/message.service';
import { Component, OnInit, Input, ɵLocaleDataIndex } from '@angular/core';
import { WebSocketService } from 'src/app/core/services/web-sockets/web-socket.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-chat-room-preview',
  templateUrl: './chat-room-preview.component.html',
  styleUrls: ['./chat-room-preview.component.css']
})
export class ChatRoomPreviewComponent implements OnInit {

  message: Message;
  messages: Message[];

  @Input() room: Room;

  constructor(private messageService: MessageService, private wsService: WebSocketService) { }

  ngOnInit() {

    this.wsService.send({
      eventType: "on-link-room",
      eventData: {
        messageId: Guid.create().toString(),
        senderId: 0,
        roomId: this.room.roomId,
        content: "",
        timestamp: new Date(),
        username: ""
      }
    });

    this.messageService.getMessageHistory(this.room.roomId, new Date().toISOString(), 1).subscribe({
      next: m => {
        this.message = m.history[0]
      },
      error: err => console.log(err)
    })

    this.messageService.getObservableRoom(this.room.roomId).messages.subscribe({
      next: data => {
        this.message = data
      },
      error: err => console.log(err)
    });

  }

}
