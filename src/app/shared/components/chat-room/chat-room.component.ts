import { DataPacket } from './../../../core/models/data-packet';
import { WebSocketService } from '../../../core/services/web-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnDestroy, OnInit {

    private roomId: string;
    private messsageContent: string;
    private recivedMessages: string[] = [];

    constructor(private wsService: WebSocketService, private route: ActivatedRoute) {
        this.route.paramMap.subscribe(params => this.roomId = params.get("id"));
        wsService.receivedMessages().subscribe(message => this.recivedMessages.push(message.eventData.content));
    }

    // Too early after connection is established.
    ngOnInit(): void {

        this.wsService.send({
            eventType: "on-room",
            eventData: {
                senderId: "1",
                roomId: this.roomId,
                content: "",
                timestamp: new Date(),
                username: ""
            }
        });
    }

    sendMessage() {
      this.wsService.send({
            eventType: "on-message",
            eventData: {
                senderId: "1",
                roomId: this.roomId,
                content: this.messsageContent,
                timestamp: new Date(),
                username: ""
            }
        });
    }

    closeSocket() {
        this.wsService.close();
    }

    onKey(event: any) { // without type info
        this.messsageContent = event.target.value;
    }

    ngOnDestroy(): void {
        this.closeSocket();
    }

}
