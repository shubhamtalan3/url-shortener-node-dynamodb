import { createClient } from 'redis';

const client = createClient({ url: 'redis://localhost:6379' });

client.on('error', (err) => console.error('Redis Client Error', err));

await client.connect();

export async function setCache(code, url, ttl = 3600) {
    if (ttl) {
        await client.set(code, url, { EX: ttl });
    } else {
        await client.set(code, url);
    }
}

export async function getCache(code) {
    return await client.get(code);
}
