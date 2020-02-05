import { DataPacket } from '../../../../core/models/data-packet';
import { WebSocketService } from '../../../../core/services/web-socket.service';
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
    private dataPackets: DataPacket[] = [];

    // Get room data
    // Whos in currently
    // Room name
    // who is not in

    constructor(private wsService: WebSocketService, private route: ActivatedRoute) {
        this.route.paramMap.subscribe(params => this.roomId = params.get("id"));
        wsService.receivedMessages().subscribe(dataPacket => {
            this.dataPackets.push(dataPacket)
        });
    }

    // Too early after connection is established.
    ngOnInit(): void {

        this.wsService.send({
            eventType: "on-room",
            eventData: {
                senderId: this.wsService.CurrentUser(),
                roomId: this.roomId,
                content: "",
                timestamp: new Date(),
                username: "",
                fromCurrentUser: false
            }
        });

        // 
    }

    sendMessage() {
        this.wsService.send({
            eventType: "on-message",
            eventData: {
                senderId: this.wsService.CurrentUser(),
                roomId: this.roomId,
                content: this.messsageContent,
                timestamp: new Date(),
                username: "",
                fromCurrentUser: false
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
