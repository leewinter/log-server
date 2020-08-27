import express from 'express';
import * as logHistory from '../services/history-service'

const router = new express.Router();

router.get('/history', async ({ query: { endTimeStamp: endTimeStamp = null, startTimeStamp: startTimeStamp = null, apiName: apiName = null } }, res) => {

    if (!apiName || !startTimeStamp || !endTimeStamp) {
        console.log('here');
        return res.status(500).json({ 'error': 'missing properties' });
    }

    console.log(apiName, startTimeStamp, endTimeStamp);

    logHistory.getLogWindow(
        apiName,
        startTimeStamp,
        endTimeStamp).subscribe(
            data => res.json({ data: data }),
            err => res.status(500)
        );
})

module.exports = router;