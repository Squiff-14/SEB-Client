import { AuthService } from './../authentication/auth.service';
import { WebSocketService } from './../web-sockets/web-socket.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
    private wsService: WebSocketService,
    private authService: AuthService) { }

  public uploadImage(messageId: string, image: any, roomId: number) {
    const fd = new FormData();
    fd.append('image', image, image.name);
    
    this.http.post(`/Image/${roomId}`, fd).subscribe({
      next: data => this.wsService.send({
        eventType: "on-image",
        eventData: {
          messageId: messageId,
          senderId: this.authService.currentUser().userId,
          roomId: roomId,
          content: data,
          timestamp: null,
          username: this.authService.currentUser().username,
        }
      }),
      error: err => console.log(err)
    });

  }

}
