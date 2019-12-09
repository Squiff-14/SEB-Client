import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: WebSocket;
  socketIsOpen = 1;

  create(url: string): Observable<any> {

    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onopen = (event) => console.log('Connection opened');
        this.ws.onmessage = (event) => {observer.next(event.data); console.log(event.data); };
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => { observer.complete();
                                       console.log('Connection closed');
                                    };

        // callback invoked on unsubscribe()
        return () => this.ws.close(1000, 'The user disconnected');


      }
    );
  }

  sendMessage(message: string): string {

    if (this.ws.readyState === this.socketIsOpen) {
      this.ws.send(message);
      return `Sent to server ${message}`;
    } else {
      return 'WebSocket connection is not open';
    }
  }

}

