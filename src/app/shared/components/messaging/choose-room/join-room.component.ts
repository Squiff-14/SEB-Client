import { DataPacket } from './../../../../core/models/data-packet';
import { NgxSpinnerService } from 'ngx-spinner';
  import { AuthService } from './../../../../core/services/authentication/auth.service';
import { WebSocketService } from 'src/app/core/services/web-sockets/web-socket.service';
import { RoomService } from '../../../../core/services/rooms/room.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Guid } from "guid-typescript";
import { Room } from 'src/app/core/models/Room';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  invalidForm: boolean;
  roomForm: FormGroup;
  rooms = [];
  private joinRoomSubscription: Subscription

  constructor(private roomService: RoomService, private router: Router,
    private fb: FormBuilder, private wsService: WebSocketService, 
    private authService: AuthService, private spinner: NgxSpinnerService) {
    this.invalidForm = false;
  }

  ngOnInit(): void {
    
    this.roomForm = this.fb.group({
      roomName: ['', Validators.required]
    });

    this.roomService.getAllRooms()
      .subscribe(data => {
        this.rooms = data;
      });
      
  }

  onjoinRoom(room: Room) {
    this.joinRoom(room);
  }

  onSubmit() {
    if (this.roomForm.invalid) {
      this.invalidForm = true;
      return;
    }
    this.roomService.create(this.roomForm.value.roomName).subscribe(
      (room) => {
        this.joinRoom(room);
      }
    );
  }

  private joinRoom = (room: Room) => {

    this.spinner.show();
    var user = this.authService.currentUser();
    // Send a join room event over the established ws connection
    this.wsService.send({
      eventType: "on-join-room",
      eventData: {
        messageId: Guid.create().toString(),
        senderId: user.userId,
        roomId: room.roomId,
        content: "Joined the room.",
        timestamp: new Date(),
        username: user.username,
      }
    });

    // Wait for a response from the server that the UserRoom link has successfuly been created.
    this.joinRoomSubscription = this.wsService.dataPackets().subscribe({
      next: packet  => {
        if(packet.eventType == 'on-join-room' && packet.eventData.roomId == room.roomId){
          this.spinner.hide();
          this.joinRoomSubscription.unsubscribe();
          this.router.navigate(['/chat'])
        }
      },
      error: err => console.log(err)
    });
  }
}
