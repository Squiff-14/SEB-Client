import { RoomService } from './../../../core/services/rooms/room.service';
import { MessageService } from './../../../core/services/messaging/message.service';
import { Room } from 'src/app/core/models/Room';
import { WebSocketService } from 'src/app/core/services/web-sockets/web-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit, OnDestroy {

  room: Room

  constructor(private wsService: WebSocketService, private roomService: RoomService) {
    this.wsService.create(environment.webSocketUrl);
    wsService.connectToRooms();
  }

  ngOnInit(): void {
    this.roomService.getLatestRoom().subscribe({
      next: res => this.room = res,
      error: err => console.error(err)
    })
  }

  onSelectedRoom(event): void {
    this.room = event;
  }

  ngOnDestroy(): void {
    this.wsService.close();
  }
}
