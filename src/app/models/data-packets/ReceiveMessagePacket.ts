import { DataPacket } from 'src/app/models/data-packets/data-packet';

export class ReceiveMessagePacket implements DataPacket {
    eventType: String;
    timestamp: Date;
    eventData: {
        messageId: String
        senderId: String
        roomId: String
        content: String
    }
}
