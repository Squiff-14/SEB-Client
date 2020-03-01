import { SubjectRoom } from './../../../../core/models/subject-room';
import { MessageService } from './../../../../core/services/messaging/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-chat-rooms',
  templateUrl: './recent-chat-rooms.component.html',
  styleUrls: ['./recent-chat-rooms.component.css']
})
export class RecentChatRoomsComponent implements OnInit {

  private recentRooms: SubjectRoom[];

  constructor(private messageService: MessageService) {}

  async ngOnInit() {
    this.recentRooms = await this.messageService.getObservableRooms();
  }

}
