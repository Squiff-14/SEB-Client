import { WebSocketService } from './../services/web-socket.service';
import { AuthService } from './../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';;
import decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  private isLoggedIn: boolean;

  constructor(private wsService: WebSocketService, private authService: AuthService) {
    this.authService.isLoggedIn().subscribe(result => this.isLoggedIn = result);

    //WebSocket connection is re-established upon refresh if the user is logged-in
    if (this.isLoggedIn) {
      const tokenPayload = decode(localStorage.getItem('token'));
      this.wsService.create(`ws://localhost:5000?id=${tokenPayload.nameid}`);
    }

  }
}





