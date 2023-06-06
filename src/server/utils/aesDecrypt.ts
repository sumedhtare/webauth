import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
dotenv.config();

const encryptionKey = process.env.ENCRYPTION_KEY || '123456';

export function decrypt(encryptedText: string) {
  const parsedEncrypted = CryptoJS.enc.Base64.parse(encryptedText).toString(CryptoJS.enc.Utf8);
  const decrypted = CryptoJS.AES.decrypt(parsedEncrypted, encryptionKey).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}
