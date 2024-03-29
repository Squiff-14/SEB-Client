import { Subject, observable, Observable, Subscription } from 'rxjs';
import { Room } from './../../../../core/models/Room';
import { ImageService } from './../../../../core/services/messaging/image.service';
import { User } from './../../../../core/models/User';
import { Message } from './../../../../core/models/message';
import { ScrollFixService } from '../../../../core/services/scroll-bar/scroll-fix.service';
import { MessageService } from '../../../../core/services/messaging/message.service';
import { AuthService } from '../../../../core/services/authentication/auth.service';
import { WebSocketService } from '../../../../core/services/web-sockets/web-socket.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from "guid-typescript";
import { MessageType } from 'src/app/core/models/enums/MessageType';



@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

    messages: Message[] = [];
    messageForm: FormGroup;
    connectionLost: boolean = false;
    private user: User;
    private selectedFile = null;
    private roomSubscription : Subscription;

    @Input() room: Room;

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

    ngOnChanges(changes) {
        if (!changes["room"].isFirstChange()) {
            this.roomSubscription.unsubscribe();
            this.messages = []
            this.ngOnInit();
        }
    }

    ngAfterViewInit(): void {
        this.scrollFix.init(this.scrollBar.nativeElement);
    }

    ngOnInit(): void {

        this.messageForm = this.fb.group({
            messageBox: ['']
        })

        // Get the message history of the room.
        this.messageService.getMessageHistory(this.room.roomId, new Date().toISOString(), 15).subscribe({
            next: async (res) => this.messages.push(...res.history),
            error: (err) => console.log(err)
        });

        this.roomSubscription = this.messageService.getObservableRoom(this.room.roomId).messages.subscribe({
            next: data => {
                this.receiveMessage(data)
            },
            error: err => {
                console.error(err);
            }
        });



    }

    sendMessage() {

        // If the websocket is ready, generate the message and push to list
        // for initial display
        var message: string = this.messageForm.value.messageBox;
        if (message && this.wsService.isReady()) {
            var messageId = Guid.create().toString();
            this.messages.push({
                type: MessageType.message,
                message: messageId,
                user: this.authService.currentUser(),
                sentAt: null,
                content: message
            })

            // Create the payload for the websocket and send via the service
            this.wsService.send({
                eventType: "on-message",
                eventData: {
                    messageId: messageId,
                    senderId: this.user.userId,
                    roomId: this.room.roomId,
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

        // Upon receiving a message via from the observable stream. Check to see if the message
        // already exsists in the message list. If so it's been sent by the client listening.
        // So upate with a timestamp to confirm that it has been sent
        let sentMessage = this.messages.findIndex((m) => m.message == message.message);
        if (sentMessage == -1) {
            this.messages.push(message);
        } else {
            this.messages[sentMessage] = message;
        }

    }

    // On fileSelected is the event handler for uploading images.
    onFileSelected(event) {

        // The file chosen will be pushed onto the message list using the local
        // machine file path for the inital src
        var messageId = Guid.create().toString()
        const reader = new FileReader();
        reader.onload = (e) => {
            this.messages.push({
                type: MessageType.image,
                message: messageId,
                user: this.authService.currentUser(),
                sentAt: null,
                content: reader.result,
            });
        }

        // Images are to large to be sent over websockets even as a base64
        // The image will be uploaded to the server via HTTP and at the same 
        // endpoint emit an image url to all sockets in the room to load the new server src
        reader.readAsDataURL(event.target.files[0])
        this.imgService.uploadImage(messageId, event.target.files[0], this.room.roomId).subscribe({
            error: err => console.log(err)
        });

    }

    onScroll() {
        this.scrollFix.prepareFor('up');
        if (this.messages[0].sentAt) {
            this.messageService.getMessageHistory(this.room.roomId, new Date(this.messages[0].sentAt).toISOString(), 15).subscribe({
                next: (res) => {
                    this.messages.unshift(...res.history)
                    this.scrollFix.restore();
                },
                error: (err) => console.log(err)
            });
        }
    }


}
