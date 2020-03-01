import { SubjectRoom } from './../../../../core/models/subject-room';
import { Message } from './../../../../core/models/message';
import { Observable, Subject, concat } from 'rxjs';
import { MessageService } from './../../../../core/services/messaging/message.service';
import { Component, OnInit, Input, ɵLocaleDataIndex } from '@angular/core';

@Component({
  selector: 'app-chat-room-preview',
  templateUrl: './chat-room-preview.component.html',
  styleUrls: ['./chat-room-preview.component.css']
})
export class ChatRoomPreviewComponent implements OnInit {

  message: Message;
  test: any;

  @Input() room: SubjectRoom;

  constructor(private messageService: MessageService) {

  }

  ngOnInit() {
    this.messageService.getMessageHistory(this.room.roomId, new Date().toISOString(), 1).subscribe({
      next: m => this.message = m.history[0],
      error: err => console.log(err)
    })

    var test = this.messageService.getObservableRoom(this.room.roomId);
    test.messages.asObservable().subscribe({
      next: data => {
        this.test = data.content;
        this.message = data;
        console.log(this.message.content);
      }
    })

  }

}
