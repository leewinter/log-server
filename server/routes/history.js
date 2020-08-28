import express from 'express';
import * as logHistory from '../services/history-service'

const router = new express.Router();

router.get('/history', async ({ query: { endTimeStamp: endTimeStamp = null, startTimeStamp: startTimeStamp = null } }, res) => {

    if (!startTimeStamp || !endTimeStamp) {
        return res.status(500).json({ 'error': 'missing properties' });
    }

    logHistory.getLogWindow(
        startTimeStamp,
        endTimeStamp).subscribe(
            data => res.json({ data: data }),
            err => res.status(500)
        );
})

module.exports = router;