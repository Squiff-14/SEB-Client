import { Injectable } from '@angular/core';

import { Subject, Observable, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }


  // A subject is a special type of Observeable that allows values to be multicasted 
  // to multiple observers 

  // The subject will both observe and be observed

  
  // Connection function in WebSocketService will Create a connection
  // to a specified url
  public connect(url){
      this.create(url);
    }
    
    // Create takes the specifeld url and creates a WebSocket Connection.
    private create(url){
        let socket = new WebSocket(url);

        socket.onopen = () => {
          console.log("Connection Opened");
        }

        socket.onclose = (event) =>{
          console.log("Connection closed. Code: " + event.code);
        }

        socket.onerror = () =>{
          console.log("Connection error.");
        }
    }
  }
