
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RoomService } from './../../../../core/services/rooms/room.service';
import { MessageService } from './../../../../core/services/messaging/message.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Room } from 'src/app/core/models/Room';



@Component({
  selector: 'app-recent-chat-rooms',
  templateUrl: './recent-chat-rooms.component.html',
  styleUrls: ['./recent-chat-rooms.component.css']
})
export class RecentChatRoomsComponent implements OnInit {

  @Input() rooms: Room []; 
  @Output() roomEmitter: EventEmitter<Room> = new EventEmitter<Room>();
  model: string;
 
  private modelChanged: Subject<string> = new Subject<string>();

  constructor(private messageService: MessageService,
    private roomService: RoomService) {
    this.modelChanged.pipe(debounceTime(300), distinctUntilChanged()).subscribe({
      next: data => {
        this.roomService.getRooms(data).subscribe({
          next: res => this.rooms = res,
          error: err => console.error(err)
        })
      },
      error: err => console.error(err)
    });
  }

  async ngOnInit() {
    this.roomService.getRooms("").subscribe({
      next: res => {
        this.rooms = res;
      },
      error: err => { console.error(err) }
    });
  }

  changed(search: string) {
    this.modelChanged.next(search);
  }

  selectRoom(room: Room) {
    this.roomEmitter.emit(room);
  }
}
