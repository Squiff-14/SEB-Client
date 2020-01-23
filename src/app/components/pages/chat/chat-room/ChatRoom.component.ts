import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../../../services/web-socket.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataPacket } from 'src/app/models/DataPacket/DataPacket';
import { User } from 'src/app/models/User';
import { timestamp } from 'rxjs/operators';


@Component({
    selector: 'app-chat-room',
    templateUrl: './ChatRoom.component.html',
    styleUrls: ['./ChatRoom.component.css']
})
export class ChatRoomComponent implements OnDestroy {

    private sub: any;
    private roomId: string;
    private messsageContent;
    private recievedMessage;

    status;

    constructor(private http: HttpClient,
        private wsService: WebSocketService,
        private route: ActivatedRoute) {
        wsService.bind("on-message", (data: DataPacket) => { console.log(JSON.stringify(data)) });
        wsService.bind("on-message", (data: DataPacket) => { this.recievedMessage = data.eventData.content});
    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.roomId = params['id'];
        });
    }

    sendMessage() {
        console.log(this.wsService.send('on-message', {
            roomId: this.roomId,
            content: this.messsageContent,
            timestamp: Date.now()
        }));
    }

    closeSocket() {
        this.wsService.close();
    }

    ngOnDestroy(): void {
        this.closeSocket();
    }

}
