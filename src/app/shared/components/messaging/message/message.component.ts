import { AuthService } from './../../../../core/services/auth.service';
import { Message } from './../../../../core/models/message';
import { DataPacket } from 'src/app/core/models/data-packet';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private sentByUser: boolean
  private content: String;
  private timeSent: Date;

  @Input() imagePath: String;
  @Input() message: Message;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.sentByUser = this.message.user == this.authService.currentUser()
    this.timeSent = this.message.sentAt;
  }

}
