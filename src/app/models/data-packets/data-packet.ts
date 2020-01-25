import { timestamp } from 'rxjs/operators';
export class DataPacket {
    eventType: string;
    eventData: {
        roomId:string,
        timestamp: Date
    }
}
