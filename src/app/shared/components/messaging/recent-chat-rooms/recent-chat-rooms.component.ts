import { RoomService } from './../../../../core/services/rooms/room.service';
import { SubjectRoom } from './../../../../core/models/subject-room';
import { MessageService } from './../../../../core/services/messaging/message.service';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/core/models/Room';

@Component({
  selector: 'app-recent-chat-rooms',
  templateUrl: './recent-chat-rooms.component.html',
  styleUrls: ['./recent-chat-rooms.component.css']
})
export class RecentChatRoomsComponent implements OnInit {

  private recentRooms: Room[] = [];

  constructor(private messageService: MessageService, private roomSerivce: RoomService) { }

  async ngOnInit() {
    this.roomSerivce.getRooms().subscribe({
      next: res => {
        this.recentRooms = res;
      },
      error: err => { console.error(err) }
    });
  }

}
