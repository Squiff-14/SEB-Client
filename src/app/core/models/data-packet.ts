
export interface DataPacket { 
    eventType: string;
    eventData: {
        senderId: number;
        roomId: number;
        content: string;
        timestamp: Date;
        username: string;
        fromCurrentUser: boolean;
    }
}
