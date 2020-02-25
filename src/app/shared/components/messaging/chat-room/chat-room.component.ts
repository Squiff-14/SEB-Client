import { ScrollFixService } from './../../../../core/services/scroll-fix.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { timestamp } from 'rxjs/operators';
import { MessageService } from './../../../../core/services/message.service';
import { Message } from './../../../../core/models/message';
import { AuthService } from './../../../../core/services/auth.service';
import { WebSocketService } from '../../../../core/services/web-socket.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from "guid-typescript";



@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnDestroy, OnInit {

    private roomId: number;
    private messages: Message[] = [];
    private messageForm: FormGroup;

    @ViewChild('scrollBar', { static: true }) scrollBar: ElementRef;

    constructor(
        private wsService: WebSocketService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private scrollFix: ScrollFixService) { }

    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    ngAfterViewInit(): void {
        this.scrollFix.init(this.scrollBar.nativeElement);
    }

    ngOnInit(): void {
        this.messageForm = this.fb.group({
            messageBox: ['']
        })
        this.route.paramMap.subscribe(params => this.roomId = +params.get("id"));
        this.messageService.getMessageHistory(this.roomId, new Date().toISOString()).subscribe({
            next: (res) => this.messages.push(...res.history),
            error: (err) => console.log(err)
        });
        this.wsService.receivedMessages().subscribe({
            next: data => this.receiveMessage(data),
            error: err => console.log(err)
        });

        var messageId = Guid.create().toString();

        // Continue testing the sent confirmation
        // messageID should exsist in list. 
        // Once this is tested do the same with a normal chat message
        // Got here
        this.messages.push({
            message: messageId,
            user: this.authService.currentUser(),
            sentAt: null,
            content: "Joined the room."
        })

        this.wsService.send({
            eventType: "on-room",
            eventData: {
                messageId: messageId,
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
        var message: string = this.messageForm.value.messageBox;
        if (message) {
            var test = Guid.create().toString();
            this.messages.push({
                message: test,
                user: this.authService.currentUser(),
                sentAt: null,
                content: message
            })
            this.wsService.send({
                eventType: "on-message",
                eventData: {
                    messageId: Guid.create().toString(),
                    senderId: this.authService.currentUser(),
                    roomId: this.roomId,
                    content: message,
                    timestamp: new Date(),
                    username: "",
                    fromCurrentUser: false
                }
            });
            this.messageForm.reset();
        }
    }

    receiveMessage(message: Message) {
        let sentMessage = this.messages.findIndex((m) => m.message == message.message);
        if(sentMessage == -1){
            this.messages.push(message);
        }else{
            this.messages[sentMessage] = message;
        }

    }

    closeSocket(): void {
        this.wsService.close();
    }

    ngOnDestroy(): void {
        this.closeSocket();
    }

    onScroll() {
        this.scrollFix.prepareFor('up');
        this.messageService.getMessageHistory(this.roomId, this.messages[0].sentAt).subscribe({
            next: (res) => {
                this.messages.unshift(...res.history)
                this.scrollFix.restore();
            },
            error: (err) => console.log(err)
        });
    }


}
