import express from 'express';
import { getUrl } from '../services/dynamo.js';

const router = express.Router();

router.get('/:code', async (req, res) => {
    const { code } = req.params;

    // 1. Try Redis
    const cached = await getCache(code);
    if (cached) {
        return res.redirect(cached);
    }

    // 2. Fallback to DynamoDB
    const item = await getUrl(code);
    if (!item) return res.status(404).send('Not found');

    // Expiry check
    if (item.expiry && item.expiry < Date.now()) {
        await deleteUrl(code);
        return res.status(410).send('Link expired');
    }

    // 3. Cache result
    await setCache(code, item.long_url);

    res.redirect(item.long_url);
});

export default router;
