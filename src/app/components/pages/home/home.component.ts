import { WebSocketService } from './../../../services/web-socket.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { DataPacket } from 'src/app/models/DataPacket/DataPacket';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
  }
}
