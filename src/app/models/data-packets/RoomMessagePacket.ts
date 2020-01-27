import { DataPacket } from 'src/app/models/data-packets/data-packet';

export class RoomMessagePacket implements DataPacket {
    eventType: String;
    timestamp: Date;
    eventData: {
        roomId: String
    };
}
