import express from 'express';
import { shortenSchema } from '../schema/shorten.js';
import { saveUrl, getUrl } from '../services/dynamo.js';
import { randomBase62 } from '../utils/base62.js';

const router = express.Router();

async function generateUniqueCode(length = 6, maxRetries = 5) {
    for (let i = 0; i < maxRetries; i++) {
        const code = randomBase62(length);
        const exists = await getUrl(code);
        if (!exists) return code;
    }
    throw new Error('Failed to generate unique code after retries');
}

router.post('/shorten', async (req, res) => {
    const { error, value } = shortenSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { url, expiry } = value;
    if (!url) return res.status(400).json({ error: 'Missing URL' });

    try {
        const code = await generateUniqueCode(6);
        await saveUrl(code, url, expiry || null);
        // Warm cache with TTL if expiry given
        let ttl;
        if (expiry) {
            const now = Math.floor(Date.now() / 1000);
            ttl = Math.max(expiry - now, 1);
        }
        await setCache(code, url, ttl);

        res.json({ shortUrl: `http://localhost:3000/${code}`, code, expiry });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not generate short code' });
    }
});

export default router;
