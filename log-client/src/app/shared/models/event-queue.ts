import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

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
        this.timestamp = new Date(obj.timestamp);
        this.sourceApi = obj.sourceApi;
    }
    level: string;
    msg: string;
    timestamp: Date;
    sourceApi: string;
}

export interface EventQueue {
    queueEvent: string;
    queue: any[];
    queueLength: number;
    pushedQueue$: BehaviorSubject<any[] | WinstonLog[]>;
}