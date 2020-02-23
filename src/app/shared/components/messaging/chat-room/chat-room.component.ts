import { FormGroup, FormBuilder } from '@angular/forms';
import { timestamp } from 'rxjs/operators';
import { MessageService } from './../../../../core/services/message.service';
import { Message } from './../../../../core/models/message';
import { AuthService } from './../../../../core/services/auth.service';
import { DataPacket } from '../../../../core/models/data-packet';
import { WebSocketService } from '../../../../core/services/web-socket.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnDestroy, OnInit {

    private roomId: number;
    private messages: Message[] = [];
    private messageForm: FormGroup;

    // Get room data
    // Whos in currently
    // Room name
    // who is not in

    @ViewChild('scrollMe', {static: true}) private myScrollContainer: ElementRef;

    constructor(private wsService: WebSocketService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private messageService: MessageService,
        private fb: FormBuilder) {

        this.messageForm = this.fb.group({
            messageBox: [''] 
        })

        this.route.paramMap.subscribe(params => this.roomId = +params.get("id"));
        this.messageService.getMessageHistory(this.roomId, new Date().toISOString()).subscribe({
            next: (res) => {
                this.messages.push(...res.history)
            },
            error: (err) => console.log(err)
        });

        wsService.receivedMessages().subscribe(message => {
            if (this.messages.includes(message))
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

        var message :string = this.messageForm.value.messageBox; 
        if(message){
            this.messages.push({
                // GUID that goes into the DB for message ID
                // That way could see if message exsits in list. 
                message: null,
                user: this.authService.currentUser(),
                sentAt: null,
                content: message
            })
    
            this.wsService.send({
                eventType: "on-message",
                eventData: {
                    senderId: this.authService.currentUser(),
                    roomId: this.roomId,
                    content: message,
                    timestamp: new Date(),
                    username: "",
                    fromCurrentUser: false
                }
            });
            this.messageForm.reset();
            this.myScrollContainer.nativeElement.scrollIntoView(false);
        }
    }

    closeSocket() {
        this.wsService.close();
    }

    ngOnDestroy(): void {
        this.closeSocket();
    }

    onScroll(){
        this.messageService.getMessageHistory(this.roomId, this.messages[0].sentAt).subscribe({
            next: (res) => {
                this.messages.unshift(...res.history)
            },
            error: (err) => console.log(err)
        });
    }
  

}
