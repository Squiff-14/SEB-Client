import { RoomService } from './../../../core/services/rooms/room.service';
import { MessageService } from './../../../core/services/messaging/message.service';
import { Room } from 'src/app/core/models/Room';
import { WebSocketService } from 'src/app/core/services/web-sockets/web-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  room: Room
  rooms: Room[] = [];
  private hasNoRooms: boolean = false;

  constructor(private wsService: WebSocketService, private roomService: RoomService, private spinner :NgxSpinnerService) {
    wsService.connectToRooms();
  }

  ngOnInit(): void {

    this.spinner.show();
    this.roomService.getRooms("").subscribe({
      next: res => {
        this.rooms = res;
        if(this.rooms.length > 0){
          this.room = this.rooms[0];
        }else{
          this.hasNoRooms = true;
        }
        this.spinner.hide();
      },
      error: err => { console.error(err) }
    });

  }

  onSelectedRoom(event): void {
    this.room = event;
  }

}
