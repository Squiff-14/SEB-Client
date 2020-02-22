import { timestamp } from 'rxjs/operators';
import { MessageService } from './../../../../core/services/message.service';
import { Message } from './../../../../core/models/message';
import { AuthService } from './../../../../core/services/auth.service';
import { WebSocketService } from '../../../../core/services/web-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnDestroy, OnInit {

    private userId: number;
    private roomId: number;
    private messsageContent: string;
    private messages: Message[] = [];

    // Get room data
    // Whos in currently
    // Room name
    // who is not in

    constructor(private wsService: WebSocketService, private route: ActivatedRoute,
        private authService: AuthService, private messageService: MessageService) {

        this.userId = this.authService.currentUser();
        this.route.paramMap.subscribe(params => this.roomId = +params.get("id"));
        this.messageService.getMessageHistory(this.roomId, 0).subscribe({
            next: (res) => {
                console.log(res)
                // this.messages.push(...res.history)
            },
            error: (err) => console.log(err)
        });

        wsService.receivedMessages().subscribe(message => {
            // if(this.messages.includes(message))
            console.log(message)
            this.messages.push(message);
        });

    }

    ngOnInit(): void {

        this.wsService.send({
            eventType: "on-room",
            eventData: {
                senderId: this.authService.currentUser(),
                roomId: this.roomId,
                content: "Joined the room.",
                timestamp: new Date(),
                username: "",
                fromCurrentUser: false
            }
        });

    }

    sendMessage() {

        // this.messages.push({
        //     // GUID that goes into the DB for message ID
        //     // That way could see if message exsits in list. 
        //     message: null, 
        //     user: this.userId,
        //     sentAt: null,
        //     content: this.messsageContent 
        // })

        this.wsService.send({
            eventType: "on-message",
            eventData: {
                senderId: this.authService.currentUser(),
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
