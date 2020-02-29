import { User } from './User';
import { MessageType } from './enums/MessageType';

export interface Message {
    type: MessageType;
    message: string;
    sentAt: Date;
    content: any;
    user: User;
}
