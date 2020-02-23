import { Message } from './../../../../core/models/message';
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
  private content: String;
  private timeSent: Date;

  @Input() imagePath: String;
  @Input() message: Message;

  

  constructor() {}

  ngOnInit() {
      this.timeSent = this.message.sentAt;
  }

}
