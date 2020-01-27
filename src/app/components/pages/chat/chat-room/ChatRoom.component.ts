import { timestamp } from 'rxjs/operators';
import { SendMessagePacket } from './../../../../models/data-packets/SendMessagePacket';
import { RoomMessagePacket } from './../../../../models/data-packets/RoomMessagePacket';
import { WebSocketService } from '../../../../services/web-socket.service';
import { Guid } from 'guid-typescript';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-chat-room',
    templateUrl: './ChatRoom.component.html',
    styleUrls: ['./ChatRoom.component.css']
})
export class ChatRoomComponent implements OnDestroy, OnInit {

    private roomId: string;
    private messsageContent: string;
    private recivedMessages: string[] = [];

    constructor(private wsService: WebSocketService, private route: ActivatedRoute) {
        this.route.paramMap.subscribe(params => this.roomId = params.get("id"));
        wsService.receivedMessages().subscribe(message => this.recivedMessages.push(message));
    }
    
    // Too early after connection is established.
    ngOnInit(): void {
        var packetData: RoomMessagePacket = {
            eventType: "on-room",
            timestamp: new Date(),
            eventData: {
                roomId: this.roomId,
            }
        }
        console.log(this.wsService.send(packetData));
    }

    sendMessage() {
        var dataPacket: SendMessagePacket = {
            eventType: "on-message",
            timestamp: new Date(),
            eventData: {
                // dont need sender ID as we have the websocket with the ID
                // not being used in the server atm
                senderId: "",
                roomId: this.roomId,
                messageId: Guid.create().toString(),
                content: this.messsageContent
            }
        }
        console.log(this.wsService.send(dataPacket));
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
