import { User } from '../User'

export class DataPacket {
    
    eventType: string
    eventData: { 
        //messageID: string;
        roomId: string;
        content: string;     
        timestamp: Date;  
    }

}
