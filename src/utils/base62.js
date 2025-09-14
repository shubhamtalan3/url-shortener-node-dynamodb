const alphabet =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function randomBase62(length = 6) {
    let s = '';
    for (let i = 0; i < length; i++) {
        const rand = Math.floor(Math.random() * 62);
        s += alphabet[rand];
    }
    return s;
}
