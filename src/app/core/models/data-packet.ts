
export interface DataPacket { 
    eventType: String;
    eventData: {
        senderId: Number;
        roomId: String;
        content: String;
        timestamp: Date;
        username: String;
        fromCurrentUser: boolean;
    }
}
