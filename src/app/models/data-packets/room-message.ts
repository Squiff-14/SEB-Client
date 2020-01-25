import { timestamp } from 'rxjs/operators';
import { DataPacket } from './data-packet';
import { Guid } from 'guid-typescript';
export class RoomMessage extends DataPacket {
    eventData: {
        roomId: string,
        timestamp: Date,
        messageId: string;
        content: string;
    };
}
