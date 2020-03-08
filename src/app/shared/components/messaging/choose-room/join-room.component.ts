import { RoomService } from '../../../../core/services/rooms/room.service';
import { DataPacket } from '../../../../core/models/data-packet'
import { timestamp } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WebSocketService } from '../../../../core/services/web-sockets/web-socket.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  invalidForm: boolean;
  roomForm: FormGroup;
  rooms = [];
  private selectedRoom: string;

  constructor(private roomService: RoomService, private router: Router,
    private fb: FormBuilder) {
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

  joinRoom() {
    this.router.navigate(["/chat", this.selectedRoom]);
  }

  onSubmit() {
    if (this.roomForm.invalid) {
      this.invalidForm = true;
      return;
    }
    this.roomService.create(this.roomForm.value.roomName).subscribe(
      (room) => {
        this.router.navigate(["/chat", room.roomId]);
      }
    );
  }
}
