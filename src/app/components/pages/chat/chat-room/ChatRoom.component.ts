import { RoomMessage } from './../../../../models/data-packets/room-message';
import { WebSocketService } from '../../../../services/web-socket.service';
import { Guid } from 'guid-typescript';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataPacket } from 'src/app/models/data-packets/data-packet';

@Component({
    selector: 'app-chat-room',
    templateUrl: './ChatRoom.component.html',
    styleUrls: ['./ChatRoom.component.css']
})
export class ChatRoomComponent implements OnDestroy, OnInit {

    private roomId: string;
    private messsageContent: string;
    private recievedMessage = "";

    constructor(private wsService: WebSocketService, private route: ActivatedRoute) {
        this.route.paramMap.subscribe(params => {
            this.roomId = params.get("id");
        });
        wsService.bind("on-message", (data: any) => { JSON.stringify(data) });
        wsService.bind("on-message", (data: any) => { this.recievedMessage = data.content });
    }

    ngOnInit(): void {
        var packetData: DataPacket = {
            eventType: "on-room",
            eventData: {
                roomId: this.roomId,
                timestamp: new Date()
            }
        }
        console.log(this.wsService.send(packetData));
    }

    sendMessage() {
        var dataPacket: RoomMessage = {
            eventType: "on-message",
            eventData: {
                roomId: this.roomId,
                timestamp: new Date(),
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
