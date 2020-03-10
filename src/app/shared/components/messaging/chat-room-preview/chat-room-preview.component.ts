
import { Room } from './../../../../core/models/Room';
import { Message } from './../../../../core/models/message';
import { MessageService } from './../../../../core/services/messaging/message.service';
import { Component, OnInit, Input} from '@angular/core';
import { MessageType } from 'src/app/core/models/enums/MessageType';

@Component({
  selector: 'app-chat-room-preview',
  templateUrl: './chat-room-preview.component.html',
  styleUrls: ['./chat-room-preview.component.css']
})
export class ChatRoomPreviewComponent implements OnInit {

  message: Message;
  messages: Message[];
  content: string;

  @Input() room: Room;

  constructor(private messageService: MessageService) { }

  ngOnInit() {

    this.messageService.getMessageHistory(this.room.roomId, new Date().toISOString(), 1).subscribe({
      next: m => {
        this.message = m.history[0]
        this.content = (this.message.type == MessageType.image)? "Sent an image." : this.message.content
      },
      error: err => console.log(err)
    })

    this.messageService.getObservableRoom(this.room.roomId).messages.subscribe({
      next: data => {
        this.message = data;
        this.content = (this.message.type == MessageType.image)? "Sent an image." : this.message.content
      },
      error: err => console.log(err)
    });

  }
  
}
