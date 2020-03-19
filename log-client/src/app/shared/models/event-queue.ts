import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as moment from 'moment';

export class WinstonLog {
    // Instance checker
    static [Symbol.hasInstance](obj) {
        if (!obj.level) return false;
        if (!obj.msg) return false;
        if (!obj.timestamp) return false;
        if (!obj.sourceApi) return false;
        return true;
    }
    constructor(obj) {
        this.level = obj.level;
        this.msg = obj.msg;        
        this.timestamp = moment(obj.timestamp);
        this.sourceApi = obj.sourceApi;
        this.classes = [];
    }
    level: string;
    msg: string;
    timestamp: moment.Moment;
    sourceApi: string;
    classes: string[];
}

export interface EventQueue {
    queueEvent: string;
    queue: any[] | WinstonLog[];
    queueLength: number;
    pushedQueue$: BehaviorSubject<any[] | WinstonLog[]>;
}