// server.mjs
import { encryptDataController } from './controllers/encryptionController.mjs';
import { decryptDataController } from './controllers/decryptionController.mjs';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Create an AWS KMS instance directly using environment variables
const kms = new AWS.KMS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION||"ap-south-1"
});



async function runEncryption() {
  try {
    const publicKeyId = 'alias/Async-encryption';
    const dataToEncrypt = 'Hello, this is a secret message!';

    // Encrypt data using the public key
    const encryptedData = await encryptDataController(dataToEncrypt, publicKeyId);

    // Decrypt data using AWS KMS
    await decryptDataController(encryptedData);
  } catch (error) {
    console.error('Error in runEncryption:', error);
  }
}

// Run the runEncryptionExample
runEncryption();
