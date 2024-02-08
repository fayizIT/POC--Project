//kmsService
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION ||"ap-south-1"
});


const kms = new AWS.KMS();

// Function to encrypt data using AWS KMS
async function encryptData(plainText, keyId) {
  const params = {
    KeyId: keyId,
    Plaintext: Buffer.from(plainText),
    EncryptionAlgorithm: 'RSAES_OAEP_SHA_256', // Use asymmetric encryption algorithm
  };

  

  try {
    const result = await kms.encrypt(params).promise();
    return result.CiphertextBlob.toString('base64');
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
}



// Function to decrypt data using AWS KMS
async function decryptData(ciphertextBlob) {
  const params = {
    CiphertextBlob: Buffer.from(ciphertextBlob, 'base64'),
  };

  try {
    const result = await kms.decrypt(params).promise();
    return result.Plaintext.toString('utf-8');
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw error;
  }
}

export { encryptData, decryptData };

