import { DataPacket } from 'src/app/models/DataPacket/DataPacket';
import { Router } from '@angular/router';
import { WebSocketService } from '../../../../services/web-socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ChooseRoom',
  templateUrl: './ChooseRoom.component.html',
  styleUrls: ['./ChooseRoom.component.css']
})
export class ChooseRoomComponent implements OnInit {

  constructor(private wsService: WebSocketService, private router: Router) { }

  private selectedRoom: string;
  private rooms = [
    { id: 1, label: "Room 1" },
    { id: 1, label: "Room 2" },
    { id: 3, label: "Room 3" }
  ]


  ngOnInit() {
  }

  joinRoom() {
    // Does the server need anything else when a user joins a room? 
    this.wsService.send('on-join-room', {
      roomId: this.selectedRoom,
      timestamp: Date.now()
    });
    this.router.navigate(["/chat"]);
  }

}
