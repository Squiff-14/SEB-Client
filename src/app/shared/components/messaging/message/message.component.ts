import { DataPacket } from 'src/app/core/models/data-packet';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{

  private fromCurrentUser: boolean
  private message: String;
  private timeSent: Date;

  @Input() imagePath: String;
  @Input() dataPacket: DataPacket;

  constructor() {}

  ngOnInit() {
    if(this.dataPacket){
      this.fromCurrentUser = this.dataPacket.eventData.fromCurrentUser
      this.message = this.dataPacket.eventData.content;
      this.timeSent = this.dataPacket.eventData.timestamp;
    }
  }

}
