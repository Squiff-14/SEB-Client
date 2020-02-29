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
    return this.http.post(`/Image/${roomId}/${messageId}`, fd)
  }

  public getImage(messageUrl: string) {
    return this.http.get(`/Image`, { params: { imagePath: messageUrl }, responseType: 'blob' });
  }

}
