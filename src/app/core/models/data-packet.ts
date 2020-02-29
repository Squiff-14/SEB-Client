
export interface DataPacket { 
    eventType: string;
    eventData: {
        messageId: string;
        senderId: number;
        roomId: number;
        content: any;
        timestamp: Date;
        username: string;
    }
}
