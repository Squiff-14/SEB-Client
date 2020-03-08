import { RoomService } from './../../../core/services/rooms/room.service';
import { MessageService } from './../../../core/services/messaging/message.service';
import { Room } from 'src/app/core/models/Room';
import { WebSocketService } from 'src/app/core/services/web-sockets/web-socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent implements OnInit {

  room: Room

  constructor(private wsService: WebSocketService, private roomService: RoomService) {
    wsService.connectToRooms();
  }

  ngOnInit() {
    this.roomService.getLatestRoom().subscribe({
      next: res => this.room = res,
      error: err => console.error(err)
    })
  }

  onSelectedRoom(event) {
    this.room = event;
  }
}
