import { environment } from './../../environments/environment';
import { WebSocketService } from './services/web-sockets/web-socket.service';
import { Component } from '@angular/core';;
import { AuthService } from './services/authentication/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private isLoggedIn: boolean;

  constructor(private wsService: WebSocketService, private authService: AuthService) {
    this.authService.isLoggedIn().subscribe(result => this.isLoggedIn = result);
    //WebSocket connection is re-established upon refresh if the user is logged-in
    if (this.isLoggedIn) {
      this.wsService.create(environment.webSocketUrl);
    }

  }
}





