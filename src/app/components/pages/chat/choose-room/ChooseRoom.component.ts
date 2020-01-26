import { DataPacket } from '../../../../models/data-packets/data-packet'
import { timestamp } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WebSocketService } from '../../../../services/web-socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ChooseRoom',
  templateUrl: './ChooseRoom.component.html',
  styleUrls: ['./ChooseRoom.component.css']
})
export class ChooseRoomComponent {

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
