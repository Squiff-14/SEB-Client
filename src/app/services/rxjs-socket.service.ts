
import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { inject } from '@angular/core/testing';


// Interface is better than a class as a datatype in TypeScript
// becuase javascript does not support interfaces, so during compliation the interface is gone.
// this saves bytes in the compiled code.

export interface ChatMessage {
  useId: number;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class RxjsSocketService {

  private wsSubject: WebSocketSubject<any>;

  constructor(private readonly wsUrl: string) {}


  private get WsSubject(): WebSocketSubject<any> {

    const closed = !this.wsSubject || this.wsSubject.closed;
    if (closed) {
      this.wsSubject = new WebSocketSubject(this.wsUrl);
    }
    return this.wsSubject;
  }

  get messageUpdates(): Observable<ChatMessage> {
    return this.wsSubject.asObservable();
  }

  sendMessage(userID: number, message: string): void {
    this.wsSubject.next(JSON.stringify({userID, message}));

  }


}
