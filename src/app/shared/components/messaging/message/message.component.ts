import { AuthService } from './../../../../core/services/authentication/auth.service';
import { Message } from './../../../../core/models/message';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private sentByUser: boolean

  @Input() imagePath: String;
  @Input() message: Message;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.sentByUser = this.message.user.userId == this.authService.currentUser().userId
  }

}
