import Datastore from 'nedb';
import db from './datastore'
import { Observable } from 'rxjs';

export function getAllLogs() {
    return new Observable(subscriber => {
        db.find({}, function (err, docs) {
            if (err) subscriber.error(err);
            subscriber.next(docs);
        });
    })
}

export function getLogWindow(startTimeStamp, endTimeStamp) {
    return new Observable(subscriber => {
        db.find({
            timestamp: {
                $gte: startTimeStamp,
                $lte: endTimeStamp,
            }
        }, function (err, docs) {
            if (err) subscriber.error(err);
            subscriber.next(docs);
        });
    })
}