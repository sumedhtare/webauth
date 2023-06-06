import CryptoJS from 'crypto-js';

const encryptionKey = process.env.ENCRYPTION_KEY || '123456';

export function encrypt(text:string) {
  const encrypted = CryptoJS.AES.encrypt(text, encryptionKey).toString();
  const base64Encrypted = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
  return base64Encrypted;
}
