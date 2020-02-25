import { Guid } from 'guid-typescript';

export interface DataPacket { 
    eventType: string;
    eventData: {
        messageId: string;
        senderId: number;
        roomId: number;
        content: string;
        timestamp: Date;
        username: string;
        fromCurrentUser: boolean;
    }
}
