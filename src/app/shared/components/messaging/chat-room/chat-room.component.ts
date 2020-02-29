import { ImageService } from './../../../../core/services/messaging/image.service';
import { User } from './../../../../core/models/User';
import { Message } from './../../../../core/models/message';
import { ScrollFixService } from '../../../../core/services/scroll-bar/scroll-fix.service';
import { MessageService } from '../../../../core/services/messaging/message.service';
import { AuthService } from '../../../../core/services/authentication/auth.service';
import { WebSocketService } from '../../../../core/services/web-sockets/web-socket.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from "guid-typescript";
import { MessageType } from 'src/app/core/models/enums/MessageType';



@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnDestroy, OnInit {

    private user: User;
    private roomId: number;
    private messages: Message[] = [];
    private messageForm: FormGroup;
    private connectionLost: boolean = false;
    private selectedFile = null;

    @ViewChild('scrollBar', { static: true }) scrollBar: ElementRef;

    constructor(
        private wsService: WebSocketService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private messageService: MessageService,
        private imgService: ImageService,
        private fb: FormBuilder,
        private scrollFix: ScrollFixService) {
        this.user = this.authService.currentUser();
    }

    ngAfterViewInit(): void {
        this.scrollFix.init(this.scrollBar.nativeElement);
    }

    ngOnInit(): void {
        this.messageForm = this.fb.group({
            messageBox: ['']
        })

        this.route.paramMap.subscribe(params => this.roomId = +params.get("id"));
        this.wsService.receivedMessages().subscribe({
            next: data => this.receiveMessage(data),
            error: err => console.log(err)
        });

        var messageId = Guid.create().toString();
        this.messageService.getMessageHistory(this.roomId, new Date().toISOString()).subscribe({
            next: async (res) => {
                this.messages.push(...res.history)
                if (this.messages.length == 0) {
                    this.messages.push({
                        type: MessageType.message,
                        message: messageId,
                        user: this.authService.currentUser(),
                        sentAt: null,
                        content: "Joined the room."
                    })
                }
            },
            error: (err) => console.log(err)
        });

        this.wsService.send({
            eventType: "on-room",
            eventData: {
                messageId: messageId,
                senderId: this.user.userId,
                roomId: this.roomId,
                content: "Joined the room.",
                timestamp: new Date(),
                username: this.user.username
            }
        });
    }

    sendMessage() {
        var message: string = this.messageForm.value.messageBox;
        if (message && this.wsService.isReady()) {
            var messageId = Guid.create().toString();

            // Only push if its the fisrt time joing the room 
            this.messages.push({
                type: MessageType.message,
                message: messageId,
                user: this.authService.currentUser(),
                sentAt: null,
                content: message
            })

            this.wsService.send({
                eventType: "on-message",
                eventData: {
                    messageId: messageId,
                    senderId: this.user.userId,
                    roomId: this.roomId,
                    content: message,
                    timestamp: new Date(),
                    username: this.user.username
                }
            });

            this.messageForm.reset();

        } else {
            this.connectionLost = true;
        }
    }

    receiveMessage(message: Message) {
        let sentMessage = this.messages.findIndex((m) => m.message == message.message);
        if (sentMessage == -1) {
            this.messages.push(message);
        } else {
            this.messages[sentMessage] = message;
        }

    }

    onFileSelected(event) {
        var messageId = Guid.create().toString()
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(reader);
            this.messages.push({
                type: MessageType.image,
                message: messageId,
                user: this.authService.currentUser(),
                sentAt: null,
                content: reader.result,
            });
        }
        reader.readAsDataURL(event.target.files[0])
        this.imgService.uploadImage(messageId, event.target.files[0], this.roomId).subscribe({
            error: err => console.log(err)
        });
    }

    closeSocket(): void {
        this.wsService.close();
    }

    ngOnDestroy(): void {
        this.closeSocket();
    }

    onScroll() {
        this.scrollFix.prepareFor('up');
        if (this.messages[0].sentAt) {
            this.messageService.getMessageHistory(this.roomId, this.messages[0].sentAt).subscribe({
                next: (res) => {
                    this.messages.unshift(...res.history)
                    this.scrollFix.restore();
                },
                error: (err) => console.log(err)
            });
        }
    }


}
