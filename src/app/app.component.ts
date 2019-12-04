import { WebSocketService } from './services/web-socket.service';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SEB-Website';

  constructor(private http : HttpClient, private wsService : WebSocketService){
    debugger

    console.log("Attempting to connect");
    wsService.connect("ws://localhost:5000");

    
    debugger

  }






  // Test of Login function with valid credentials
  // Currently working returning JWT token to be stored in cookie
  // For futuren authenticated API requests. 

  //   this.login("Squiffler14", "Oakwell14");
  // }

  // public login(username: string, password: String){

  //   const data = {'username': username, 'password': password};
  //   const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  //   var url : string = "https://localhost:5001/api/Authentication/login";
  //     this.http.post(url, data, config).subscribe(res => console.log(res));
  // }
}