import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

if (!process.env.SECRET) {
    throw new Error('Environment variable SECRET is not defined.');
}

const key = Buffer.from(process.env.SECRET, 'base64');

export function encrypt(data: string): string {
    try {
        const iv = randomBytes(16);
        const cipher = createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}.${encrypted}`;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data.');
    }
}

export function decrypt(encryptedData: string): string | null {
    try {
        const parts = encryptedData.split('.');
        if (parts.length !== 2) return null;

        const [iv, content] = parts;
        if (!iv || !content) return null;

        const decipher = createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(content, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
}
