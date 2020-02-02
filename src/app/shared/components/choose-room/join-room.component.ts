import { RoomService } from './../../../core/services/room.service';
import { DataPacket } from '../../../core/models/data-packet'
import { timestamp } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WebSocketService } from '../../../core/services/web-socket.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  private roomForm: FormGroup;
  private invalidForm: boolean;
  private selectedRoom: string;
  private rooms;

  constructor(private roomService: RoomService, private router: Router,
    private fb: FormBuilder) {
    this.invalidForm = false;
  }

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      roomName: ['', Validators.required]
    });

    this.roomService.getRooms()
    .subscribe(data => {
      this.rooms = data.rooms;
    });
  }

  joinRoom() {
    this.router.navigate(["/chat", this.selectedRoom]);
  }

  onSubmit() {
    if (this.roomForm.invalid) return;
    this.roomService.create(this.roomForm.value.roomName).subscribe(
      (room) => {
        this.router.navigate(["/chat", room.roomId]);
      }
    );
  }
}
