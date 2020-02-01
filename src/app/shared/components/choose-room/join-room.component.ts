import { DataPacket } from '../../../core/models/data-packet'
import { timestamp } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WebSocketService } from '../../../core/services/web-socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent {

  constructor(private wsService: WebSocketService, private router: Router) { }

  private selectedRoom: string;
  private rooms = [
    { id: 1, label: "Room 1" },
    { id: 2, label: "Room 2" },
    { id: 3, label: "Room 3" }
  ]

  joinRoom() {
    this.router.navigate(["/chat", this.selectedRoom]);
  }
}
