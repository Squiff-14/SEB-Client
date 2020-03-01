import { Observable, Subject } from 'rxjs';
import { Message } from './message';

export class SubjectRoom {
    roomId: number;
    messages: Subject<Message>;
}
