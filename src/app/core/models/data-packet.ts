
export interface DataPacket { 
    eventType: String;
    eventData: {
        senderId: string;
        roomId: string;
        content: string;
        timestamp: Date;
        username: string;
    }
}
