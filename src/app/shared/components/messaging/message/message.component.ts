import { ImageService } from './../../../../core/services/messaging/image.service';
import { AuthService } from './../../../../core/services/authentication/auth.service';
import { Message } from './../../../../core/models/message';
import { Component, OnInit, Input } from '@angular/core';
import { MessageType } from 'src/app/core/models/enums/MessageType';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private sentByUser: boolean;
  private image: any;

  @Input() imagePath: String;
  @Input() message: Message;

  constructor(private authService: AuthService, private imageService: ImageService, private sanitizer: DomSanitizer ) { }

  ngOnInit() {
    this.sentByUser = this.message.user.userId == this.authService.currentUser().userId
  }

}
